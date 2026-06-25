import nodemailer from "nodemailer";
import formidable from "formidable";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  console.log("PAYMENT API HIT:", req.method);

  // Only allow POST
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      error: "Method Not Allowed",
    });
  }

  const form = formidable({
    multiples: true,
    keepExtensions: true,
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Form parse error:", err);

      return res.status(500).json({
        success: false,
        error: "Unable to process uploaded files",
      });
    }

    try {
      const ticketId =
        "PCH-" +
        Math.floor(10000 + Math.random() * 90000) +
        "-" +
        new Date().getFullYear();

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

      // Helper for formidable v2/v3 compatibility
      const getFile = (file) => {
        if (!file) return null;
        return Array.isArray(file) ? file[0] : file;
      };

      const frontImage = getFile(files.frontImage);
      const backImage = getFile(files.backImage);
      const receipt = getFile(files.receipt);

      if (frontImage) {
        attachments.push({
          filename: frontImage.originalFilename,
          content: fs.readFileSync(frontImage.filepath),
        });
      }

      if (backImage) {
        attachments.push({
          filename: backImage.originalFilename,
          content: fs.readFileSync(backImage.filepath),
        });
      }

      if (receipt) {
        attachments.push({
          filename: receipt.originalFilename,
          content: fs.readFileSync(receipt.filepath),
        });
      }

      const name = Array.isArray(fields.name) ? fields.name[0] : fields.name;

      const email = Array.isArray(fields.email)
        ? fields.email[0]
        : fields.email;

      const type = Array.isArray(fields.type) ? fields.type[0] : fields.type;

      // Admin email
      await transporter.sendMail({
        from: `"PCH Payments" <${process.env.SMTP_USER}>`,
        to: "info@supportpch.com",
        subject: `Payment Submission - ${ticketId}`,
        html: `
          <h2>New Payment Submission</h2>

          <p><strong>Ticket ID:</strong> ${ticketId}</p>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Submission Type:</strong> ${type}</p>

          <p>
            Uploaded files are attached to this email.
          </p>
        `,
        attachments,
      });

      // Customer email
      if (email) {
        await transporter.sendMail({
          from: `"PCH Payments" <${process.env.SMTP_USER}>`,
          to: email,
          subject: `Payment Submission Received - ${ticketId}`,
          html: `
            <div style="
              font-family: Arial, sans-serif;
              max-width: 600px;
              margin: auto;
              padding: 25px;
            ">
              <h2 style="color:#0470ff;">
                Payment Submission Received
              </h2>

              <p>Hello ${name},</p>

              <p>
                We have successfully received your payment
                submission and supporting documents.
              </p>

              <div style="
                background:#f6c300;
                padding:12px 16px;
                border-radius:8px;
                display:inline-block;
                font-weight:bold;
              ">
                Ticket ID: ${ticketId}
              </div>

              <p style="margin-top:20px;">
                Our verification team will review your
                submission and contact you if additional
                information is required.
              </p>

              <p>
                Thank you,<br />
                <strong>PCH Support Team</strong>
              </p>
            </div>
          `,
        });
      }

      return res.status(200).json({
        success: true,
        ticketId,
      });
    } catch (error) {
      console.error("Payment API Error:", error);

      return res.status(500).json({
        success: false,
        error: "Server Error",
      });
    }
  });
}
