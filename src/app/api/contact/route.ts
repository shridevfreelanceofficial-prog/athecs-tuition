import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { sendSubmissionEmail } from "@/lib/mail";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, subject, message } = body;

    // Validate fields
    if (!name || !phone || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Save to Database
    await sql`
      INSERT INTO contacts (name, phone, subject, message)
      VALUES (${name}, ${phone}, ${subject || ""}, ${message})
    `;

    // Send email using Brevo
    try {
      await sendSubmissionEmail("contact", {
        name,
        phone,
        subject: subject || "No Subject",
        message,
      });
    } catch (mailError) {
      console.error("Brevo Email delivery failed:", mailError);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Contact submission error:", error);
    return NextResponse.json({ error: error.message || "Failed to process contact request" }, { status: 500 });
  }
}
