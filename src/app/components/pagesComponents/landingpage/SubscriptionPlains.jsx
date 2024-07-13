import React, { useState } from "react";
import SubscriptionCard from "../../Cards/SubscriptionCard";
import { subscriptionPlans } from "@/data/data";
import { loadScript } from "@paypal/paypal-js";

const SubscriptionPlans = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const paymentMethod = (price) => {
    loadScript({ "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID }).then(
      (paypal) => {
        paypal
          .Buttons({
            createOrder: (data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: "USD",
                      value: parseFloat(price).toFixed(2),
                    },
                  },
                ],
              });
            },
            onApprove: (data, actions) => {
              // Handle approval
            },
            onCancel: (data) => {
              // Handle cancellation
            },
            onError: (err) => {
              // Handle errors
              console.error(err);
            },
          })
          .render("#paypal-button-container");
      }
    );
  };

  const handlePlanSelect = (index, price) => {
    setSelectedPlan(index);
    paymentMethod(price);
  };

  return (
    <main className="flex flex-col items-center justify-center p-[2vw]">
      <h1 className="pt-[3vw] text-[5.5vw] sm:text-[3.5vw] lg:text-[2.5vw] font-medium text-[#171717]">
        All-access pass
      </h1>
      <p className="text-[4vw] sm:text-[2vw] lg:text-[1vw] text-[#525252] font-medium mt-[0.7vw] w-full max-w-[80vw] sm:max-w-[49vw] lg:max-w-[31vw] text-center">
        Hear from our satisfied clients and learn how we've helped them take
        their businesses to new heights.
      </p>
      <section className="w-full max-w-[80vw] mx-auto mt-[3vw] sm:mt-[8vw] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[10vw] md:gap-[5vw] lg:gap-[2vw] items-center">
        {subscriptionPlans?.map((plan, index) => (
          <div key={index}>
            <SubscriptionCard
              {...plan}
              paymentMethod={() => handlePlanSelect(index, plan.price)}
            />
          </div>
        ))}
      </section>
      {selectedPlan !== null && (
        <div id="paypal-button-container" className=""></div>
      )}
      <button className="bg-[#FFFF] mt-[3vw] sm:mt-[9vw] lg:mt-[4vw] border-[1px] border-[#FF387A] font-medium hover:font-medium text-[4vw] sm:text-[2vw] lg:text-[1vw] hover:text-white hover:shadow-md hover:bg-[#ff387af6] text-[#FF387A] p-[2.5vw] md:p-[0.9vw] rounded-md w-full max-w-[30vw] sm:max-w-[15vw] lg:max-w-[10vw] text-center">
        Play Video
      </button>
    </main>
  );
};

export default SubscriptionPlans;
