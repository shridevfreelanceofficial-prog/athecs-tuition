import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function GET() {
  try {
    const list = await sql`
      SELECT id, student_name, parent_name, mobile_number, email, grade, school_name, message, created_at
      FROM admissions
      ORDER BY created_at DESC
    `;
    return NextResponse.json(list);
  } catch (error: any) {
    console.error("Failed to fetch admissions:", error);
    return NextResponse.json({ error: error.message || "Failed to load admissions data" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const idStr = url.searchParams.get("id");
    if (!idStr) {
      return NextResponse.json({ error: "Missing log ID parameter" }, { status: 400 });
    }
    const id = parseInt(idStr, 10);

    await sql`
      DELETE FROM admissions WHERE id = ${id}
    `;

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Failed to delete admission:", error);
    return NextResponse.json({ error: error.message || "Failed to delete item" }, { status: 500 });
  }
}
