import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Inquiry from '@/models/Inquiry';
import nodemailer from 'nodemailer';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request) {
  try {
    const data = await request.json();
    const { type = 'inquiry', fullName, company, email, phone, category, productInterest, message } = data;

    // Validate Required Fields based on type
    if (type === 'brochure') {
      if (!email) {
        return NextResponse.json({ success: false, error: 'Email is required for brochure download.' }, { status: 400 });
      }
    } else {
      if (!fullName || !email || !category) {
        return NextResponse.json({ success: false, error: 'Name, email, and category are required.' }, { status: 400 });
      }
    }

    // Basic Email Format Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ success: false, error: 'Please provide a valid email address.' }, { status: 400 });
    }

    await connectToDatabase();

    // Prevent Duplicate Submissions (from same email within 5 minutes)
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    const recentInquiry = await Inquiry.findOne({ 
      email: email, 
      createdAt: { $gte: fiveMinutesAgo } 
    }).lean();

    if (recentInquiry) {
       return NextResponse.json({ success: false, error: 'You have recently submitted an inquiry. Please wait before sending another.' }, { status: 429 });
    }

    // Save Inquiry to MongoDB
    const inquiry = await Inquiry.create({
      type,
      fullName: fullName || 'N/A',
      company,
      email,
      phone,
      category: category || 'Brochure Download',
      productInterest,
      message,
    });

    // Send Emails Logic (Nodemailer)
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT || 587,
        secure: process.env.EMAIL_SECURE === 'true', 
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      // Define Content based on Type
      const isBrochure = type === 'brochure';
      const isRfq = type === 'rfq';
      
      let notificationSubject = `New Inquiry Received: ${category} - ${fullName}`;
      if (isBrochure) notificationSubject = `[Brochure Download] - ${productInterest || 'Metatech Asset'}`;
      if (isRfq) notificationSubject = `[Quotation Request] - ${category} - ${fullName}`;
        
      let notificationTitle = 'New Website Inquiry';
      if (isBrochure) notificationTitle = 'New Brochure Download';
      if (isRfq) notificationTitle = 'New Machine Quotation Request';
      
      const productNameDisplay = productInterest ? `<p><strong>Product Downloaded:</strong> ${productInterest}</p>` : '';

      // Internal Notification to Sales
      const internalMailOptions = {
        from: `Metatech Website <${process.env.EMAIL_FROM || process.env.EMAIL_USER}>`,
        to: 'sales@metatechind.com',
        subject: notificationSubject,
        html: `
          <div style="font-family: sans-serif; color: #333;">
            <h2 style="color: #1a3c5a; border-bottom: 2px solid #1E6FA8; padding-bottom: 10px;">${notificationTitle}</h2>
            ${!isBrochure ? `<p><strong>Name:</strong> ${fullName}</p>` : ''}
            ${!isBrochure && company ? `<p><strong>Company:</strong> ${company || 'N/A'}</p>` : ''}
            <p><strong>Email:</strong> ${email}</p>
            ${!isBrochure && phone ? `<p><strong>Phone:</strong> ${phone || 'N/A'}</p>` : ''}
            <br/>
            ${isBrochure ? productNameDisplay : `
            <p><strong>Category:</strong> ${category}</p>
            <p><strong>Product Interest:</strong> ${productInterest || 'N/A'}</p>
            <p><strong>Message:</strong></p>
            <div style="background-color: #f8fafc; padding: 15px; border-left: 4px solid #1E6FA8; margin-top: 5px;">
               ${message ? message.replace(/\n/g, '<br/>') : 'No message provided.'}
            </div>
            `}
          </div>
        `,
      };

      const userSubject = isBrochure 
        ? `Here is your requested brochure - ${productInterest || 'Metatech Industries'}`
        : isRfq 
        ? `Your Quotation Request has been received - Metatech Industries`
        : 'We’ve received your inquiry';

      const userGreeting = isBrochure ? 'Hello,' : `Hi ${fullName},`;
      
      let userMessageBody = `<p>Thank you for reaching out to Metatech Industries.</p>
           <p>This is an automated confirmation that we've received your inquiry regarding <strong>${category}</strong>. Our dedicated sales and technical support team will review your requirements and get back to you shortly.</p>`;
           
      if (isBrochure) {
         userMessageBody = `<p>Thank you for expressing interest in Metatech Industries.</p>
           <p>We see you recently downloaded the brochure for <strong>${productInterest}</strong>.</p>
           <p>If you have any further technical questions or require a specific quotation, please reply to this email to speak directly with an engineer.</p>`;
      } else if (isRfq) {
         userMessageBody = `<p>Thank you for submitting your technical requirements to Metatech Industries.</p>
           <p>Our engineering team has received your Request for Quotation (RFQ) for the <strong>${category}</strong> system.</p>
           <p>We are currently reviewing your specific constraints and workflow requirements. A dedicated sales engineer will contact you shortly with a customized pricing model and technical recommendation.</p>
           <br/>
           <div style="background-color: #f8fafc; padding: 15px; border-left: 4px solid #1E6FA8; font-size: 13px;">
             <strong>Your Submission Summary:</strong><br/><br/>
             ${message ? message.replace(/\n/g, '<br/>') : 'Specifications attached.'}
           </div>`;
      }

      // Load and Parse the HTML Template for User Email
      let templateHtml = '';
      try {
        const templatePath = path.join(process.cwd(), 'src', 'app', 'templates', 'InquiryEmail.html');
        templateHtml = await fs.readFile(templatePath, 'utf8');
        templateHtml = templateHtml.replace('{{Name}}', fullName);
        templateHtml = templateHtml.replace('{{MessageBody}}', userMessageBody);
        
        // Dynamically update the CTA Button text/link based on Context
        if (isBrochure) {
           templateHtml = templateHtml.replace('View Our Machines &nbsp; →', 'Explore Specifications &nbsp; →');
           // The button link stays pointing to /products, or we can make it dynamic
        } else if (isRfq) {
           templateHtml = templateHtml.replace('View Our Machines &nbsp; →', 'Review Our Process &nbsp; →');
           templateHtml = templateHtml.replace('https://metatechindustries.com/products', 'https://metatechindustries.com/about');
        }
      } catch (err) {
        console.error("Warning: Could not load InquiryEmail.html template. Falling back to inline HTML.", err);
        templateHtml = `
          <div style="font-family: sans-serif; color: #333; line-height: 1.6;">
            <div style="text-align: center; margin-bottom: 20px;">
                <img src="https://metatechindustries.com/images/metatech_logo.png" alt="Metatech Industries" style="max-width: 180px; height: auto;">
                <div style="height: 2px; width: 40px; background-color: #1E6FA8; margin: 10px auto;"></div>
            </div>
            <p>${userGreeting}</p>
            ${userMessageBody}
            <br/>
            <p>Best regards,<br/><strong>The Metatech Industries Sales Team</strong></p>
            <div style="margin-top: 15px; font-size: 13px; color: #666; line-height: 1.5;">
              <strong>Email:</strong> <a href="mailto:sales@metatechind.com" style="color: #1F4E79; text-decoration: none;">sales@metatechind.com</a> | <a href="mailto:meta@metatechind.com" style="color: #1F4E79; text-decoration: none;">meta@metatechind.com</a><br/>
              <strong>Address:</strong> Cosmos Bank Bldg, 476, Laxmi Rd, Bhatanca Bol, Narayan Peth, Pune, MH 411030, India
            </div>
            <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
            <p style="font-size: 12px; color: #888; text-align: center;">Cosmos Bank Bldg, 476, Laxmi Rd, Bhatanca Bol, Narayan Peth, Pune, MH 411030, India</p>
          </div>
        `;
      }

      // User Confirmation Email
      const userMailOptions = {
        from: `Metatech Industries <${process.env.EMAIL_FROM || process.env.EMAIL_USER}>`,
        to: email,
        subject: userSubject,
        html: templateHtml,
      };

      try {
        await Promise.all([
          transporter.sendMail(internalMailOptions),
          transporter.sendMail(userMailOptions)
        ]);
        console.log(`Emails sent successfully for inquiry ${inquiry._id}`);
      } catch (emailError) {
        console.error('Failed to send inquiry emails:', emailError);
        // We log the error but still return success because the DB save was successful
      }
    } else {
        console.warn('Email environment variables not configured. Skipping email notifications.');
    }

    return NextResponse.json({ success: true, id: inquiry._id }, { status: 201 });

  } catch (error) {
    console.error('Inquiry Submission Error:', error);
    return NextResponse.json({ success: false, error: 'An unexpected server error occurred.' }, { status: 500 });
  }
}
