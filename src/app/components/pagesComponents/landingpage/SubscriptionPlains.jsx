import React, { useState, useEffect } from "react";
import SubscriptionCard from "../../Cards/SubscriptionCard";
import { subscriptionPlans } from "@/data/data";
import { loadScript } from "@paypal/paypal-js";
import { toast } from "sonner";

const SubscriptionPlans = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  useEffect(() => {
    if (selectedPlan !== null) {
      const containerId = `paypal-button-container-${selectedPlan.index}`;
      paymentMethod(selectedPlan.price, containerId);
    }
  }, [selectedPlan]);

  const paymentMethod = (price, containerId) => {
    // Clear the container before rendering PayPal buttons
    document.getElementById(containerId).innerHTML = "";
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
              toast.success("Payment success", {
                position: "top-right",
              });
            },
            onCancel: (data) => {
              // Handle cancellation
            },
            onError: (err) => {
              // Handle errors
              toast.error("Payment error", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
            },
          })
          .render(`#${containerId}`);
      }
    );
  };
  const handlePlanSelect = (index, price) => {
    // Clear previous PayPal button container
    if (selectedPlan !== null) {
      const prevContainerId = `paypal-button-container-${selectedPlan.index}`;
      document.getElementById(prevContainerId).innerHTML = "";
    }

    setSelectedPlan({ index, price });
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
              paypalContainerId={`paypal-button-container-${index}`}
            />
            {selectedPlan && selectedPlan.index === index && (
              <div id={`paypal-button-container-${index}`}></div>
            )}
          </div>
        ))}
      </section>
    </main>
  );
};

export default SubscriptionPlans;
