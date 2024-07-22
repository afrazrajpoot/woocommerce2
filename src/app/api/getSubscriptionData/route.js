import { connection } from "@/dbConfig/dbConfig";
import Subscription from "@/models/subscription";
import { NextResponse } from "next/server";
connection();

export async function POST(req) {
  try {
    const { id } = await req.json();

    const subscription = await Subscription.findById(id);
    if (!subscription) {
      return NextResponse.json(
        { message: "Subscription not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, subscription: subscription },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    console.log(id, "params id");
    if (!id) {
      return NextResponse.json(
        { message: "ID parameter is required" },
        { status: 400 }
      );
    }

    const subscription = await Subscription.findById({ _id: id });
    if (!subscription) {
      return NextResponse.json(
        { message: "Subscription not found" },
        { status: 404 }
      );
    }

    subscription.downloadLimit -= 1;
    await subscription.save();

    return NextResponse.json(
      { success: true, subscription: subscription },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}
