import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { sendSubmissionEmail } from "@/lib/mail";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { studentName, parentName, mobileNumber, email, grade, schoolName, message } = body;

    // Validate fields
    if (!studentName || !parentName || !mobileNumber || !email || !grade || !schoolName) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Save to Database
    await sql`
      INSERT INTO admissions (student_name, parent_name, mobile_number, email, grade, school_name, message)
      VALUES (${studentName}, ${parentName}, ${mobileNumber}, ${email}, ${grade}, ${schoolName}, ${message || ""})
    `;

    // Send email using Brevo
    try {
      await sendSubmissionEmail("admission", {
        studentName,
        parentName,
        mobileNumber,
        email,
        grade,
        schoolName,
        message,
      });
    } catch (mailError) {
      // Log mail error, but don't fail the request since database write was successful
      console.error("Brevo Email delivery failed:", mailError);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Admission submission error:", error);
    return NextResponse.json({ error: error.message || "Failed to process admission request" }, { status: 500 });
  }
}
