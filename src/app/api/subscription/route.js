// pages/api/subscribe.js
import { connection } from "@/dbConfig/dbConfig";
import Subscription from "@/models/subscription";
// import Subscription from "../../../models/subscription";

import { NextResponse } from "next/server";
connection();
export async function POST(req) {
  const { username, email, price, downloadLimit, available, userId } =
    await req.json();
  // console.log(username, email, price, available, userId, "userdetail");
  const subscription = new Subscription({
    userId: userId,
    username: username, // Replace with actual username
    email: email, // Replace with actual email
    startDate: new Date(), // Current date as start date
    endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)), // End date one month from start date
    planType: available, // Subscription plan type
    downloadLimit: downloadLimit,
    price: price, // Subscription price
  });
  if (available === "Regular") {
    subscription.downloadLimit = 5;
  } else if (available === "Basic") {
    subscription.downloadLimit = 10;
  } else if (available === "Premium") {
    subscription.downloadLimit = 15;
  }
  await subscription.save();
  return NextResponse.json(
    { success: true, subscription: subscription },
    { status: 200 }
  );
}

// export async function PUT(req, res) {
//   try {
//     const { id } = req.json();

//     const subscription = await Subscription.findById(id);

//     if (!subscription) {
//       return NextResponse.json(
//         { message: "Subscription not found" },
//         { status: 404 }
//       );
//     }

//     subscription.downloadLimit = subscription.downloadLimit - 1;
//     await subscription.save();
//     return NextResponse.json({ success: true }, { status: 200 });
//   } catch (err) {
//     return NextResponse.json(
//       { success: false, message: err.message },
//       { status: 500 }
//     );
//   }
// }
