// models/Subscription.js
import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true }, // PayPal purchase ID
  status: { type: String, default: "ACTIVE" }, // ACTIVE, CANCELLED, EXPIRED
  startDate: { type: Date },
  endDate: { type: Date },
  planType: { type: String }, // e.g., 'monthly'
  downloadLimit: { type: Number, default: 0 },
  price: { type: Number, required: true },
});

const Subscription =
  mongoose.models.Subscription ||
  mongoose.model("Subscription", subscriptionSchema);
export default Subscription;
