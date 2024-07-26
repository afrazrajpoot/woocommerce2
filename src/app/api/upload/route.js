import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import crypto from "crypto";
import User from "@/models/userModel";
import { connection } from "@/dbConfig/dbConfig";

// Function to generate a unique file name

function generateUniqueFileName(originalName) {
  const timestamp = Date.now();
  const randomString = crypto.randomBytes(8).toString("hex");
  const extension = path.extname(originalName);
  const baseName = path.basename(originalName, extension);
  return `${baseName}_${timestamp}_${randomString}${extension}`;
}

export async function POST(req) {
  connection();
  try {
    const data = await req.formData();
    const file = data.get("file");
    const id = data.get("id");

    if (!file) {
      return NextResponse.json({ error: "File not found" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Generate a unique file name
    const uniqueFileName = generateUniqueFileName(file.name);

    // Define the path to save the file in the public folder
    const publicFolderPath = path.join(process.cwd(), "public/uploads");
    const filePath = path.join(publicFolderPath, uniqueFileName);

    // Save the file to the public folder
    await writeFile(filePath, buffer);

    // Generate the URL to access the file
    const fileUrl = `/uploads/${uniqueFileName}`;

    // Fetch and update the user
    const user = await User.findById({ _id: id });
    console.log(user, "user");
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    user.img = fileUrl;
    await user.save();

    return NextResponse.json({ success: true, user }, { status: 200 });
  } catch (err) {
    console.error("Error during file upload or user update:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
