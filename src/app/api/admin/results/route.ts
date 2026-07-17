import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { put, del } from "@vercel/blob";

export async function GET() {
  try {
    const list = await sql`
      SELECT id, title, batch, category, image_url as image
      FROM results
      ORDER BY created_at DESC
    `;
    return NextResponse.json(list);
  } catch (error: any) {
    console.error("Failed to fetch results:", error);
    return NextResponse.json({ error: error.message || "Failed to load results" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const title = formData.get("title") as string;
    const batch = formData.get("batch") as string;
    const category = formData.get("category") as string;
    const imageFile = formData.get("image") as File;

    if (!title || !batch || !category || !imageFile) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // 1. Upload to Vercel Blob
    const blobName = `results/${Date.now()}-${imageFile.name}`;
    const blob = await put(blobName, imageFile, {
      access: "public",
    });

    // 2. Save image URL to DB
    await sql`
      INSERT INTO results (title, batch, category, image_url)
      VALUES (${title}, ${batch}, ${category}, ${blob.url})
    `;

    return NextResponse.json({ success: true, url: blob.url });
  } catch (error: any) {
    console.error("Failed to add result:", error);
    return NextResponse.json({ error: error.message || "Failed to save academic result" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const idStr = url.searchParams.get("id");
    if (!idStr) {
      return NextResponse.json({ error: "Missing ID" }, { status: 400 });
    }
    const id = parseInt(idStr, 10);

    // Get the image URL first
    const record = await sql`SELECT image_url FROM results WHERE id = ${id}`;
    if (record.length === 0) {
      return NextResponse.json({ error: "Result not found" }, { status: 404 });
    }
    const imageUrl = record[0].image_url;

    // 1. Delete from Vercel Blob if not a local asset
    if (imageUrl.startsWith("http")) {
      try {
        await del(imageUrl);
      } catch (blobErr) {
        console.error("Failed to delete Vercel Blob asset:", blobErr);
      }
    }

    // 2. Delete from DB
    await sql`DELETE FROM results WHERE id = ${id}`;

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Failed to delete result:", error);
    return NextResponse.json({ error: error.message || "Failed to delete item" }, { status: 500 });
  }
}
