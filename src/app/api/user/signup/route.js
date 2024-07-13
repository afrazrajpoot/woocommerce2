import { connection } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connection();

export async function POST(req) {
  try {
    const reqBody = await req.json();
    const { fullName, email, password } = reqBody;
    const user = await User.findOne({ email: email });
    if (user) {
      return NextResponse.json(
        {
          message: "User already exists",
        },
        { status: 400 }
      );
    }
    const salt = await bcryptjs.genSalt();
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    // send email
    // await sendMail(email, "Welcome to Son Duck Film", "Thanks for signing up!");
    return NextResponse.json({
      message: "User created successfully",
      user: newUser,
    });
  } catch (err) {
    return NextResponse.json(
      {
        message: err.message,
      },
      { status: 500 }
    );
  }
}
