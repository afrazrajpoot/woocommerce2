import Subscription from "@/models/subscription";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { id } = params;
    // console.log(id, "my id");
    if (!id) {
      return NextResponse.json(
        { message: "userId parameter is required" },
        { status: 400 }
      );
    }

    const subscription = await Subscription.findById(id);

    if (!subscription) {
      return NextResponse.json(
        { message: "Subscription not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, subscription }, { status: 200 });
  } catch (err) {
    console.error("Error in GET request:", err);
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}
