import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { name, email, address, message } = req.body;

  // Generate Ticket ID
  const ticketId =
    "PCH-" +
    Math.floor(10000 + Math.random() * 90000) +
    "-" +
    new Date().getFullYear();

  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Send email
    await transporter.sendMail({
      from: `"PCH Support" <${process.env.SMTP_USER}>`,
      to: "info@pch.com",
      subject: `New Support Request — Ticket ${ticketId}`,
      html: `
        <h2>PCH Support Contact Form</h2>
        <p><strong>Ticket ID:</strong> ${ticketId}</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Address:</strong><br/>${address}</p>
        <p><strong>Message:</strong><br/>${message || "(none provided)"}</p>
      `,
    });

    return res.status(200).json({ success: true, ticketId });
  } catch (err) {
    console.error("Email error:", err);
    return res.status(500).json({ success: false });
  }
}
