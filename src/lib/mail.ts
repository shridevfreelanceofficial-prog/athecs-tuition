import nodemailer from "nodemailer";
import path from "path";

interface MailConfig {
  studentName?: string;
  parentName?: string;
  mobileNumber?: string;
  email?: string;
  grade?: string;
  schoolName?: string;
  message?: string;
  // Contact Us specific fields
  name?: string;
  phone?: string;
  subject?: string;
}

export async function sendSubmissionEmail(type: "admission" | "contact", data: MailConfig) {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || "587", 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const emailTo = process.env.EMAIL_TO || "athecsacademywebsite@gmail.com";

  // Debug log — to check env vars are loaded
  console.log("[MAIL] SMTP config:", {
    host,
    port,
    user,
    pass: pass ? `${pass.substring(0, 8)}...` : "MISSING",
    emailTo,
  });

  if (!host || !user || !pass) {
    console.error("[MAIL] ❌ SMTP Credentials missing. Skipping email notification.");
    return;
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // true for 465, false for 587 STARTTLS
    auth: {
      user,
      pass,
    },
  });

  let mailSubject = "";
  let mailHtml = "";
  let senderEmail = data.email || data.phone || "no-reply@athecs.com";

  if (type === "admission") {
    const student = data.studentName;
    const parent = data.parentName;
    const grade = data.grade;
    const school = data.schoolName;
    const phone = data.mobileNumber;
    const emailStr = data.email;
    const msg = data.message || "None provided";

    mailSubject = `New Admission Form Submission: ${student} (Class ${grade})`;
    senderEmail = emailStr || senderEmail;

    mailHtml = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc; padding: 30px; margin: 0;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); overflow: hidden; border: 1px solid #e2e8f0;">
          <div style="background-color: #ffffff; padding: 30px 25px; text-align: center; border-bottom: 1px solid #f1f5f9;">
            <table align="center" border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto; border-collapse: collapse;">
              <tr>
                <td style="padding-right: 14px; vertical-align: middle;">
                  <img src="cid:logo_symbol" alt="ATHECS Symbol" width="54" height="54" style="display: block; border: 0; outline: none;" />
                </td>
                <td style="vertical-align: middle;">
                  <img src="cid:logo_text" alt="ATHECS Wordmark" width="180" style="display: block; border: 0; outline: none;" />
                </td>
              </tr>
            </table>
            <p style="margin: 12.5px 0 0 0; color: #64748b; font-size: 14px; font-weight: 500;">New Admission Application Received</p>
          </div>
          
          <div style="padding: 30px; color: #334155; line-height: 1.6;">
            <p style="margin-top: 0; font-size: 16px; font-weight: 600;">Dear Admin,</p>
            <p style="font-size: 15px; color: #64748b;">A new student has filled out the admission form on the ATHECS Tuition website. Below are the details:</p>
            
            <div style="margin: 25px 0; border-collapse: collapse; border-radius: 12px; overflow: hidden; border: 1px solid #f1f5f9;">
              <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                <tr style="background-color: #f8fafc;">
                  <td style="padding: 12px 15px; font-weight: 600; color: #475569; width: 35%; border-bottom: 1px solid #f1f5f9;">Student Name</td>
                  <td style="padding: 12px 15px; color: #0f172a; border-bottom: 1px solid #f1f5f9;">${student}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 15px; font-weight: 600; color: #475569; border-bottom: 1px solid #f1f5f9;">Parent Name</td>
                  <td style="padding: 12px 15px; color: #0f172a; border-bottom: 1px solid #f1f5f9;">${parent}</td>
                </tr>
                <tr style="background-color: #f8fafc;">
                  <td style="padding: 12px 15px; font-weight: 600; color: #475569; border-bottom: 1px solid #f1f5f9;">Class / Grade</td>
                  <td style="padding: 12px 15px; color: #0f172a; border-bottom: 1px solid #f1f5f9;"><span style="background-color: #dbeafe; color: #1e40af; padding: 4px 8px; border-radius: 6px; font-weight: 600; font-size: 13px;">${grade}</span></td>
                </tr>
                <tr>
                  <td style="padding: 12px 15px; font-weight: 600; color: #475569; border-bottom: 1px solid #f1f5f9;">Current School</td>
                  <td style="padding: 12px 15px; color: #0f172a; border-bottom: 1px solid #f1f5f9;">${school}</td>
                </tr>
                <tr style="background-color: #f8fafc;">
                  <td style="padding: 12px 15px; font-weight: 600; color: #475569; border-bottom: 1px solid #f1f5f9;">Mobile Number</td>
                  <td style="padding: 12px 15px; color: #0f172a; border-bottom: 1px solid #f1f5f9;"><a href="tel:${phone}" style="color: #2563eb; text-decoration: none; font-weight: 500;">${phone}</a></td>
                </tr>
                <tr>
                  <td style="padding: 12px 15px; font-weight: 600; color: #475569; border-bottom: 1px solid #f1f5f9;">Email Address</td>
                  <td style="padding: 12px 15px; color: #0f172a; border-bottom: 1px solid #f1f5f9;"><a href="mailto:${emailStr}" style="color: #2563eb; text-decoration: none;">${emailStr}</a></td>
                </tr>
              </table>
            </div>

            <div style="background-color: #fafafa; border-left: 4px solid #cbd5e1; padding: 15px; border-radius: 0 8px 8px 0; margin-top: 20px;">
              <h4 style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600; color: #475569;">Additional Notes / Message:</h4>
              <p style="margin: 0; font-size: 14px; color: #475569; font-style: italic;">"${msg}"</p>
            </div>
            
            <div style="margin-top: 30px; text-align: center;">
              <a href="https://wa.me/91${phone}?text=${encodeURIComponent(
                `Hello ${parent} / ${student},\n\nThank you for applying to ATHECS Tuition for Class ${grade}. We have received your admission form, and we are excited to contact you. Please let us know a convenient time to speak.\n\nBest regards,\nATHECS Tuition`
              )}" style="background-color: #22c55e; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px; display: inline-block; box-shadow: 0 2px 5px rgba(0,0,0,0.1); margin-right: 10px;">Connect on WhatsApp</a>
              <a href="tel:${phone}" style="background-color: #3b82f6; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px; display: inline-block; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">Call Customer</a>
            </div>
          </div>
          
          <div style="background-color: #f1f5f9; padding: 15px 30px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0;">
            <p style="margin: 0;">This is an automated notification from your website's contact form manager.</p>
          </div>
        </div>
      </div>
    `;
  } else if (type === "contact") {
    const name = data.name;
    const phone = data.phone;
    const subject = data.subject || "No Subject";
    const msg = data.message;

    mailSubject = `New Contact Us Inquiry: ${subject}`;

    mailHtml = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc; padding: 30px; margin: 0;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); overflow: hidden; border: 1px solid #e2e8f0;">
          <div style="background-color: #ffffff; padding: 30px 25px; text-align: center; border-bottom: 1px solid #f1f5f9;">
            <table align="center" border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto; border-collapse: collapse;">
              <tr>
                <td style="padding-right: 14px; vertical-align: middle;">
                  <img src="cid:logo_symbol" alt="ATHECS Symbol" width="54" height="54" style="display: block; border: 0; outline: none;" />
                </td>
                <td style="vertical-align: middle;">
                  <img src="cid:logo_text" alt="ATHECS Wordmark" width="180" style="display: block; border: 0; outline: none;" />
                </td>
              </tr>
            </table>
            <p style="margin: 12.5px 0 0 0; color: #64748b; font-size: 14px; font-weight: 500;">New Inquiry Received</p>
          </div>
          
          <div style="padding: 30px; color: #334155; line-height: 1.6;">
            <p style="margin-top: 0; font-size: 16px; font-weight: 600;">Dear Admin,</p>
            <p style="font-size: 15px; color: #64748b;">A visitor has submitted a contact inquiry on the ATHECS Tuition website. Below are the details:</p>
            
            <div style="margin: 25px 0; border-collapse: collapse; border-radius: 12px; overflow: hidden; border: 1px solid #f1f5f9;">
              <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                <tr style="background-color: #f8fafc;">
                  <td style="padding: 12px 15px; font-weight: 600; color: #475569; width: 35%; border-bottom: 1px solid #f1f5f9;">Sender Name</td>
                  <td style="padding: 12px 15px; color: #0f172a; border-bottom: 1px solid #f1f5f9;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 15px; font-weight: 600; color: #475569; border-bottom: 1px solid #f1f5f9;">Phone Number</td>
                  <td style="padding: 12px 15px; color: #0f172a; border-bottom: 1px solid #f1f5f9;"><a href="tel:${phone}" style="color: #4f46e5; text-decoration: none; font-weight: 500;">${phone}</a></td>
                </tr>
                <tr style="background-color: #f8fafc;">
                  <td style="padding: 12px 15px; font-weight: 600; color: #475569; border-bottom: 1px solid #f1f5f9;">Subject Title</td>
                  <td style="padding: 12px 15px; color: #0f172a; border-bottom: 1px solid #f1f5f9; font-weight: 500;">${subject}</td>
                </tr>
              </table>
            </div>

            <div style="background-color: #fafafa; border-left: 4px solid #cbd5e1; padding: 15px; border-radius: 0 8px 8px 0; margin-top: 20px;">
              <h4 style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600; color: #475569;">Message details:</h4>
              <p style="margin: 0; font-size: 14px; color: #475569; font-style: italic;">"${msg}"</p>
            </div>
            
            <div style="margin-top: 30px; text-align: center;">
              <a href="https://wa.me/91${phone}?text=${encodeURIComponent(
                `Hello ${name},\n\nThank you for reaching out to ATHECS Tuition regarding '${subject}'. We have received your inquiry: "${msg}". How can we assist you further today?\n\nBest regards,\nATHECS Tuition`
              )}" style="background-color: #22c55e; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px; display: inline-block; box-shadow: 0 2px 5px rgba(0,0,0,0.1); margin-right: 10px;">Connect on WhatsApp</a>
              <a href="tel:${phone}" style="background-color: #4f46e5; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px; display: inline-block; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">Call Customer</a>
            </div>
          </div>
          
          <div style="background-color: #f1f5f9; padding: 15px 30px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0;">
            <p style="margin: 0;">This is an automated notification from your website's contact form manager.</p>
          </div>
        </div>
      </div>
    `;
  }

  // Send mail!
  try {
    const info = await transporter.sendMail({
      from: `"ATHECS Dashboard" <${user}>`,
      to: emailTo,
      replyTo: senderEmail,
      subject: mailSubject,
      html: mailHtml,
      attachments: [
        {
          filename: "logo2.png",
          path: path.join(process.cwd(), "public", "images", "logo", "logo2.png"),
          cid: "logo_symbol",
        },
        {
          filename: "logo1.png",
          path: path.join(process.cwd(), "public", "images", "logo", "logo1.png"),
          cid: "logo_text",
        },
      ],
    });
    console.log("[MAIL] ✅ Email sent successfully! ID:", info.messageId, "| Response:", info.response);
  } catch (err: any) {
    console.error("[MAIL] ❌ sendMail FAILED:", err?.message || err);
    console.error("[MAIL] Full error:", JSON.stringify(err, null, 2));
    throw err; // re-throw so route catches it
  }
}
