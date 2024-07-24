import { NextResponse } from "next/server";
import cloudinary from "cloudinary";
import { Readable } from "stream";

// Configure Cloudinary with your credentials
cloudinary.v2.config({
  cloud_name: "dskn7duay",
  api_key: "586492171578996",
  api_secret: "kNClI4X88o3YPzMn2lv-eKOeLjk",
});

export async function POST(req) {
  try {
    const data = await req.formData();
    const file = data.get("file");

    if (!file) {
      return NextResponse.json({ error: "File not found" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Create a readable stream from the buffer
    const stream = Readable.from(buffer);

    // Promise-based wrapper around upload_stream
    const uploadPromise = new Promise((resolve, reject) => {
      const uploadStream = cloudinary.v2.uploader.upload_stream(
        { resource_type: "auto" },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );

      stream.pipe(uploadStream);
    });

    // Wait for the upload to complete
    const result = await uploadPromise;

    return NextResponse.json(
      { success: true, url: result.secure_url },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
