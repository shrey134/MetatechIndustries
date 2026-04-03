import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Inquiry from '@/models/Inquiry';
import { Parser } from 'json2csv';
import ExcelJS from 'exceljs';
import { google } from 'googleapis';

export async function GET(request) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const token = searchParams.get('token');
    const format = searchParams.get('format') || 'csv';
    
    // Filters
    const typeFilter = searchParams.get('type');
    const searchTerm = searchParams.get('search');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    // Authenticate
    const secret = process.env.ADMIN_SECRET;
    if (!secret || token !== secret) {
      return NextResponse.json({ success: false, error: 'Unauthorized.' }, { status: 401 });
    }

    await connectToDatabase();

    // Build filter
    const filter = {};
    if (typeFilter && typeFilter !== 'all') {
      filter.type = typeFilter;
    }
    if (searchTerm) {
      filter.$or = [
        { fullName: { $regex: searchTerm, $options: 'i' } },
        { email: { $regex: searchTerm, $options: 'i' } },
        { company: { $regex: searchTerm, $options: 'i' } }
      ];
    }
    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) filter.createdAt.$gte = new Date(startDate);
      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        filter.createdAt.$lte = end;
      }
    }

    const inquiries = await Inquiry.find(filter).sort({ createdAt: -1 }).lean();

    const fields = [
      { label: 'Date', value: (row) => new Date(row.createdAt).toLocaleDateString() },
      { label: 'Time', value: (row) => new Date(row.createdAt).toLocaleTimeString() },
      { label: 'Type', value: 'type' },
      { label: 'Name', value: 'fullName' },
      { label: 'Email', value: 'email' },
      { label: 'Phone', value: 'phone' },
      { label: 'Company', value: 'company' },
      { label: 'Category', value: 'category' },
      { label: 'Product Interest', value: 'productInterest' },
      { label: 'Message', value: 'message' }
    ];

    if (format === 'csv') {
      const csvFields = fields.map(f => f.label);
      const csvData = inquiries.map(inq => {
        const row = {};
        fields.forEach(f => {
          row[f.label] = typeof f.value === 'function' ? f.value(inq) : inq[f.value];
        });
        return row;
      });
      
      const parser = new Parser({ fields: csvFields });
      const csv = parser.parse(csvData);

      return new NextResponse(csv, {
        status: 200,
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': `attachment; filename=metatech-export-${new Date().toISOString().split('T')[0]}.csv`,
        },
      });
    }

    if (format === 'excel') {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Inquiries');

      worksheet.columns = fields.map(f => ({ header: f.label, key: f.label, width: 20 }));
      
      inquiries.forEach(inq => {
        const row = {};
        fields.forEach(f => {
          row[f.label] = typeof f.value === 'function' ? f.value(inq) : inq[f.value];
        });
        worksheet.addRow(row);
      });

      // Style header
      worksheet.getRow(1).font = { bold: true };
      worksheet.getRow(1).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFE0E0E0' }
      };

      const buffer = await workbook.xlsx.writeBuffer();

      return new NextResponse(buffer, {
        status: 200,
        headers: {
          'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'Content-Disposition': `attachment; filename=metatech-export-${new Date().toISOString().split('T')[0]}.xlsx`,
        },
      });
    }

    if (format === 'google-sheets') {
      const authEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
      const authKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

      if (!authEmail || !authKey) {
        return NextResponse.json({ 
            success: false, 
            error: 'Google API credentials not configured. Please add GOOGLE_SERVICE_ACCOUNT_EMAIL and GOOGLE_PRIVATE_KEY to .env.local' 
        }, { status: 500 });
      }

      const auth = new google.auth.JWT(authEmail, null, authKey, ['https://www.googleapis.com/auth/spreadsheets', 'https://www.googleapis.com/auth/drive']);
      const sheets = google.sheets({ version: 'v4', auth });
      const drive = google.drive({ version: 'v3', auth });

      const resource = {
        properties: {
          title: `MetaTech Inquiries Export - ${new Date().toLocaleString()}`,
        },
      };

      const spreadsheet = await sheets.spreadsheets.create({
        resource,
        fields: 'spreadsheetId,spreadsheetUrl',
      });

      const spreadsheetId = spreadsheet.data.spreadsheetId;

      // Add data
      const values = [
        fields.map(f => f.label),
        ...inquiries.map(inq => fields.map(f => typeof f.value === 'function' ? f.value(inq) : inq[f.value]))
      ];

      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: 'Sheet1!A1',
        valueInputOption: 'RAW',
        resource: { values },
      });

      // Share spreadsheet (only with admin email)
      const adminEmail = process.env.EMAIL_USER;
      if (adminEmail) {
        await drive.permissions.create({
          fileId: spreadsheetId,
          requestBody: {
            role: 'reader',
            type: 'user',
            emailAddress: adminEmail,
          },
        });
      }

      return NextResponse.json({ success: true, url: spreadsheet.data.spreadsheetUrl });
    }

    return NextResponse.json({ success: false, error: 'Invalid format.' }, { status: 400 });

  } catch (error) {
    console.error('Export Error:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error: ' + error.message }, { status: 500 });
  }
}
