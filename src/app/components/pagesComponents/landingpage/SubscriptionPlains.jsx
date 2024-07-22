import React, { useEffect } from "react";
import SubscriptionCard from "../../Cards/SubscriptionCard";
import { subscriptionPlans } from "@/data/data";
import { useGlobalContext } from "@/context/globalState";
import { useRouter } from "next/navigation";

const SubscriptionPlans = () => {
  const navigate = useRouter();
  const { selectedPlan, setSelectedPlan } = useGlobalContext();

  const handlePlanSelect = (index, price, features) => {
    const newSelectedPlan = { index, price, features };
    setSelectedPlan(newSelectedPlan);
    navigate.push("/payment");
    // console.log("Selected Plan Details:", selectedPlan);
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
              paymentMethod={() =>
                handlePlanSelect(index, plan.price, plan.features)
              }
            />
            {/* {selectedPlan && selectedPlan.index === index && (
              <div>
                Selected Plan: ${selectedPlan.price}
                <ul>
                  {selectedPlan.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
              </div>
            )} */}
          </div>
        ))}
      </section>
    </main>
  );
};

export default SubscriptionPlans;
