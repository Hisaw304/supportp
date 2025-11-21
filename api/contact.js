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

    await transporter.sendMail({
      from: `"PCH Support" <${process.env.SMTP_USER}>`,
      to: "info@supportpch.com",
      subject: `New Support Request — Ticket ${ticketId}`,
      html: `
        <p><strong>Ticket ID:</strong> ${ticketId}</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Address:</strong><br/>${address}</p>
        <p><strong>Message:</strong><br/>${message || "(none provided)"}</p>
      `,
    });

    // ---------- 2) Automatic Response to User ----------
    // ---------- Automatic Response to User ----------
    await transporter.sendMail({
      from: `"PCH Support" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `We received your request — Ticket ${ticketId}`,
      html: `
    <div style="
      background: #ffffff;
      padding: 28px;
      border-radius: 14px;
      box-shadow: 0 18px 40px rgba(16, 24, 40, 0.08);
      font-family: Arial, sans-serif;
      color: #414141;
      max-width: 600px;
      margin: auto;
    ">
      <h2 style="color: #0470ff; margin-bottom: 12px;">
        Thank you for contacting PCH Support
      </h2>

      <p>Hello ${name},</p>

      <p style="line-height: 1.6;">
        We have received your request and created a support ticket.
      </p>

      <div style="
        background: #f6c300;
        padding: 12px 16px;
        border-radius: 10px;
        font-weight: bold;
        margin: 20px 0;
        display: inline-block;
      ">
        Ticket ID: ${ticketId}
      </div>

      <p style="line-height: 1.6;">
        Our support team will contact you as soon as possible.
      </p>

      <p style="margin-top: 30px;">
        Best regards,<br />
        <strong>PCH Support Team</strong>
      </p>

      <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />

      <p style="font-size: 12px; color: #888;">
        This is an automated message — please do not reply.
      </p>
    </div>
  `,
    });

    return res.status(200).json({ success: true, ticketId });
  } catch (err) {
    console.error("Email error:", err);
    return res.status(500).json({ success: false });
  }
}
