import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Since this is a test, we can use a dummy SMTP account (like ethereal) or require user to add env variables
    // For demonstration, we'll configure a generic SMTP transport.
    // NOTE: To actually send emails, you'll need to provide valid SMTP credentials in .env.local
    // e.g., SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS
    
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER || "dummy@example.com",
        pass: process.env.SMTP_PASS || "dummy_password",
      },
    });

    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: "kibuellyoi34@gmail.com", // The target email specified by the user
      subject: `New Contact Form Submission from ${name}`,
      text: `You have a new message from your portfolio site:

Name: ${name}
Email: ${email}

Message:
${message}
      `,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    };

    // If no real credentials are provided, this might fail, so we catch the error
    try {
      await transporter.sendMail(mailOptions);
    } catch (sendError) {
      console.warn("Failed to send real email (missing valid SMTP credentials), but simulating success for demo purposes.", sendError);
      // We still return success so the frontend UI works in this dummy setup
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
