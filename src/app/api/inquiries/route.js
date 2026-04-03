import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Inquiry from '@/models/Inquiry';

export async function GET(request) {
  try {
    const authHeader = request.headers.get('Authorization');
    const secret = process.env.ADMIN_SECRET;

    // Simple Token-based Authorization Layer
    if (!secret || authHeader !== `Bearer ${secret}`) {
      return NextResponse.json({ success: false, error: 'Unauthorized access.' }, { status: 401 });
    }

    await connectToDatabase();
    
    // Get filter query params
    const searchParams = request.nextUrl.searchParams;
    const typeFilter = searchParams.get('type');
    const searchTerm = searchParams.get('search');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    // Build the dynamic filter object
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

    // Fetch inquiries with filters, sorted by latest
    const inquiries = await Inquiry.find(filter).sort({ createdAt: -1 }).lean();

    // Get stats (Total, Inquiries, Brochures)
    const stats = {
      total: await Inquiry.countDocuments({}),
      inquiries: await Inquiry.countDocuments({ type: 'inquiry' }),
      brochures: await Inquiry.countDocuments({ type: 'brochure' })
    };

    return NextResponse.json({ 
      success: true, 
      inquiries, 
      count: inquiries.length,
      stats 
    }, { status: 200 });

  } catch (error) {
    console.error('Fetch Admin Inquiries Error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error.' }, { status: 500 });
  }
}
