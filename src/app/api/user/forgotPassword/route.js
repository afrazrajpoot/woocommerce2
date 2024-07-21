import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import { NextResponse } from "next/server";
// import sendEmail from "@/utils/sendEmail";
import { connection } from "@/dbConfig/dbConfig";

import nodemailer from "nodemailer";
connection();
// utils/sendEmail.js

const sendEmail = async (to, subject, text) => {
  try {
    // Create a transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: "rebecca32@ethereal.email",
        pass: "bQJZNfAv89ssdHtXVm",
      },
    });

    // Send mail with defined transport object
    let info = await transporter.sendMail({
      from: `" Sonduck film`, // sender address
      to: to, // list of receivers
      subject: subject, // Subject line
      text: text, // plain text body
    });

    // console.log("Message sent: %s", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email: %s", error);
    throw new Error("Error sending email");
  }
};

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
