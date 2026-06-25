import nodemailer from "nodemailer";
import formidable from "formidable";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const form = formidable({
    multiples: true,
    keepExtensions: true,
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({
        success: false,
      });
    }

    const ticketId = "PCH-" + Math.floor(10000 + Math.random() * 90000);

    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: 465,
        secure: true,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      const attachments = [];

      if (files.frontImage) {
        attachments.push({
          filename: files.frontImage[0].originalFilename,
          content: fs.readFileSync(files.frontImage[0].filepath),
        });
      }

      if (files.backImage) {
        attachments.push({
          filename: files.backImage[0].originalFilename,
          content: fs.readFileSync(files.backImage[0].filepath),
        });
      }

      if (files.receipt) {
        attachments.push({
          filename: files.receipt[0].originalFilename,
          content: fs.readFileSync(files.receipt[0].filepath),
        });
      }

      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: "info@supportpch.com",
        subject: `Payment Submission ${ticketId}`,
        html: `
          <h3>New Payment Submission</h3>
          <p><strong>Name:</strong> ${fields.name}</p>
          <p><strong>Email:</strong> ${fields.email}</p>
          <p><strong>Type:</strong> ${fields.type}</p>
          <p><strong>Ticket:</strong> ${ticketId}</p>
        `,
        attachments,
      });

      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: fields.email,
        subject: `Submission Received ${ticketId}`,
        html: `
          <h2>Thank You</h2>
          <p>Your submission has been received.</p>
          <p><strong>Ticket ID:</strong> ${ticketId}</p>
        `,
      });

      return res.status(200).json({
        success: true,
        ticketId,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
      });
    }
  });
}
