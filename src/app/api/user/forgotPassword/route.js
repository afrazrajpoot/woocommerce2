import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import { NextResponse } from "next/server";
import sendEmail from "@/utils/sendEmail";
import { connection } from "@/dbConfig/dbConfig";
connection();

export async function POST(req) {
  try {
    const { email } = await req.json();
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        {
          message: "User not found",
        },
        { status: 404 }
      );
    }

    // Generate 5-digit OTP
    const otp = Math.floor(10000 + Math.random() * 90000).toString();

    // Save OTP to user (you need to add an otp field to your user model)
    user.otp = otp;
    await user.save();
    console.log(user);

    // Send OTP to user's email
    await sendEmail(user.email, "Your OTP Code", `Your OTP code is ${otp}`);

    // Respond with success message
    return NextResponse.json({ message: "OTP sent to email" });
  } catch (err) {
    return NextResponse.json(
      {
        message: err.message,
      },
      { status: 500 }
    );
  }
}
