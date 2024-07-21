// pages/api/subscribe.js
import { connection } from "@/dbConfig/dbConfig";
import Subscription from "../../../models/subscription";
import { NextResponse } from "next/server";
connection();
export async function POST(req) {
  const { username, email, price, downloadLimit, available } = await req.json();

  const subscription = new Subscription({
    username: username, // Replace with actual username
    email: email, // Replace with actual email
    startDate: new Date(), // Current date as start date
    endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)), // End date one month from start date
    planType: "monthly", // Subscription plan type
    downloadLimit: downloadLimit,
    price: price, // Subscription price
  });
  if (available === "1d") {
    subscription.downloadLimit = 1;
  } else if (available === "month") {
    subscription.downloadLimit = 5;
  } else if (available === "year") {
    subscription.downloadLimit = 10;
  }
  await subscription.save();
  return NextResponse.json(
    { success: true, subscription: subscription },
    { status: 200 }
  );
}

export async function PUT(req, res) {
  try {
    const { id } = req.json();

    const subscription = await Subscription.findById(id);

    if (!subscription) {
      return NextResponse.json(
        { message: "Subscription not found" },
        { status: 404 }
      );
    }

    subscription.downloadLimit = subscription.downloadLimit - 1;
    await subscription.save();
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}
