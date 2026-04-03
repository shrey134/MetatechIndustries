import { google } from 'googleapis';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { name, email } = await req.json();

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and Email are required' }, { status: 400 });
    }

    const authEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const authKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

    if (!authEmail || !authKey) {
      console.error('Google Sheets credentials missing in .env.local');
      return NextResponse.json({ 
        error: 'Google API credentials not configured.' 
      }, { status: 500 });
    }

    // Using JWT for service account authentication
    const auth = new google.auth.JWT(
      authEmail,
      null,
      authKey,
      ['https://www.googleapis.com/auth/spreadsheets']
    );

    const sheets = google.sheets({ version: 'v4', auth });
    
    // The Spreadsheet ID provided by the user
    const spreadsheetId = '10fJjuFnkEiIhBWemWc-U5Bj3v8bQpQLNQk6QrbeCk7A';
    const range = 'Sheet1!A:B';

    // Append data
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[name, email]],
      },
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Data added to Google Sheet successfully'
    });

  } catch (error) {
    console.error('Google Sheets API Error:', error);
    return NextResponse.json({ 
      error: 'Failed to add data to Google Sheet', 
      details: error.message 
    }, { status: 500 });
  }
}
