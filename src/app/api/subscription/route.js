// pages/api/subscribe.js
import Subscription from '../../../models/subscription';

export async function POST(req, res) {

    const { userId, purchaseData } = req.body;

    const { id, purchase_units, create_time } = purchaseData;
    const { amount, description } = purchase_units[0];

    const subscription = new Subscription({
      userId,
      purchaseId: id,
      status: 'ACTIVE',
      startDate: new Date(create_time),
      endDate: new Date(new Date(create_time).setDate(new Date(create_time).getDate() + 30)), // 30 days from start
      planType: description,
      downloadLimit: 5
    });

    await subscription.save();
    return res.status(200).json({ success: true, subscription });

}
