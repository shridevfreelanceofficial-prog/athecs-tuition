import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { put, del } from "@vercel/blob";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const flat = url.searchParams.get("flat") === "true";

    if (flat) {
      // Direct flat list for the public gallery page
      const list = await sql`
        SELECT ai.id, a.title AS category, ai.image_url AS image
        FROM activities a
        JOIN activity_images ai ON a.id = ai.activity_id
        ORDER BY a.created_at DESC, ai.created_at DESC
      `;
      return NextResponse.json(list);
    } else {
      // Grouped structure for the admin dashboard management screen
      const activities = await sql`
        SELECT id, title, created_at
        FROM activities
        ORDER BY created_at DESC
      `;
      const images = await sql`
        SELECT id, activity_id, image_url
        FROM activity_images
        ORDER BY created_at DESC
      `;

      const grouped = activities.map((act) => ({
        id: act.id,
        title: act.title,
        created_at: act.created_at,
        images: images
          .filter((img) => img.activity_id === act.id)
          .map((img) => ({ id: img.id, image_url: img.image_url })),
      }));

      return NextResponse.json(grouped);
    }
  } catch (error: any) {
    console.error("Failed to fetch activities:", error);
    return NextResponse.json({ error: error.message || "Failed to load activities" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const title = formData.get("title") as string;
    const images = formData.getAll("images") as File[];

    if (!title || images.length === 0) {
      return NextResponse.json({ error: "Missing title or images" }, { status: 400 });
    }

    // 1. Get or create activity
    let activityId: number;
    const existing = await sql`SELECT id FROM activities WHERE LOWER(title) = LOWER(${title})`;

    if (existing.length > 0) {
      activityId = existing[0].id;
    } else {
      const created = await sql`INSERT INTO activities (title) VALUES (${title}) RETURNING id`;
      activityId = created[0].id;
    }

    // 2. Upload each image to Vercel Blob and insert into db
    const uploadedImages = [];
    for (const imageFile of images) {
      if (imageFile.size === 0) continue;
      const blobName = `activities/${activityId}/${Date.now()}-${imageFile.name}`;
      const blob = await put(blobName, imageFile, {
        access: "public",
      });
      
      await sql`
        INSERT INTO activity_images (activity_id, image_url)
        VALUES (${activityId}, ${blob.url})
      `;
      uploadedImages.push(blob.url);
    }

    return NextResponse.json({ success: true, activityId, images: uploadedImages });
  } catch (error: any) {
    console.error("Failed to add activity:", error);
    return NextResponse.json({ error: error.message || "Failed to save activities" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const activityIdStr = url.searchParams.get("activityId");
    const imageIdStr = url.searchParams.get("imageId");

    if (imageIdStr) {
      // Option A: Delete single image
      const imageId = parseInt(imageIdStr, 10);
      const imgRecord = await sql`SELECT image_url FROM activity_images WHERE id = ${imageId}`;
      
      if (imgRecord.length === 0) {
        return NextResponse.json({ error: "Image not found" }, { status: 404 });
      }
      
      const imageUrl = imgRecord[0].image_url;
      if (imageUrl.startsWith("http")) {
        try {
          await del(imageUrl);
        } catch (blobErr) {
          console.error("Vercel Blob failed to delete single image:", blobErr);
        }
      }

      await sql`DELETE FROM activity_images WHERE id = ${imageId}`;
      return NextResponse.json({ success: true });
    } 
    
    if (activityIdStr) {
      // Option B: Delete entire activity and all its images
      const activityId = parseInt(activityIdStr, 10);
      const imgRecords = await sql`SELECT image_url FROM activity_images WHERE activity_id = ${activityId}`;
      
      for (const img of imgRecords) {
        const imageUrl = img.image_url;
        if (imageUrl.startsWith("http")) {
          try {
            await del(imageUrl);
          } catch (blobErr) {
            console.error("Vercel Blob failed to delete activity image:", blobErr);
          }
        }
      }

      // Cascade delete on relations handles activity_images deletion automatically
      await sql`DELETE FROM activities WHERE id = ${activityId}`;
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Missing parameter activityId or imageId" }, { status: 400 });
  } catch (error: any) {
    console.error("Failed to delete activity or image:", error);
    return NextResponse.json({ error: error.message || "Failed to perform delete operation" }, { status: 500 });
  }
}
