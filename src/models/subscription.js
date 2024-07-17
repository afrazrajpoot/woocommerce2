// models/Subscription.js
import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  purchaseId: { type: String, required: true }, // PayPal purchase ID
  status: { type: String, default: 'ACTIVE' }, // ACTIVE, CANCELLED, EXPIRED
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  planType: { type: String, required: true }, // e.g., 'monthly'
  downloadLimit: { type: Number, default: 5 },
  downloadsUsed: { type: Number, default: 0 }
});

const Subscription = mongoose.models.Subscription || mongoose.model('Subscription', subscriptionSchema);
export default Subscription;
