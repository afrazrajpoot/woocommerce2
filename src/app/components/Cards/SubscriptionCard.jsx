import React, { useState } from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { loadScript } from "@paypal/paypal-js";

const SubscriptionCard = ({ title, price, features, paymentMethod }) => {
  const [monthlyPlan, setMonthlyPlan] = useState(true);

  return (
    <main className="bg-[#FFFFFF] shadow-md w-full sm:max-w-[40vw] lg:max-w-[22vw] rounded-[5vw] md:rounded-[1vw] p-[3.5vw] md:p-[1.5vw]">
      <p className="text-[4vw] sm:text-[2vw] lg:text-[1vw] font-medium text-[#FF387A]">
        {title}
      </p>
      <div className="flex mt-[0.6vw] text-[#171717] items-center">
        <h1 className="text-[8.5vw] sm:text-[5vw] lg:text-[2.5vw] font-semibold ">
          ${price}
        </h1>
        <span className="text-[3.8vw] sm:text-[1.8vw] lg:text-[0.8vw] font-medium">
          /month
        </span>
      </div>
      <p className="text-[4vw] sm:text-[2vw] lg:text-[1vw] mt-[0.6vw] text-[#171717]">
        For new creators building their list
      </p>
      <section className="w-full mt-[4vw] sm:mt-[3vw] lg:mt-[1vw] rounded-full lg:max-w-[22vw] flex items-center p-[0.3vw] bg-[#F5F5F5]">
        <button
          onClick={() => setMonthlyPlan(true)}
          className={`text-[4vw] sm:text-[2vw] lg:text-[1vw] ${
            monthlyPlan ? "bg-[#ffff] text-[#FF387A]" : "text-[#171717]"
          } p-[2vw] md:p-[0.2vw] mx-[0.5vw] w-full max-w-[35vw] sm:max-w-[30vw] lg:max-w-[10vw] rounded-lg md:rounded-md`}
        >
          Monthly
        </button>
        <button
          onClick={() => setMonthlyPlan(false)}
          className={`text-[4vw] sm:text-[2vw] lg:text-[1vw] ${
            !monthlyPlan ? "bg-[#ffff] text-[#FF387A]" : "text-[#171717]"
          } p-[2vw] md:p-[0.2vw] mx-[0.5vw] w-full max-w-[35vw] sm:max-w-[30vw] lg:max-w-[10vw] rounded-lg md:rounded-md`}
        >
          Yearly
        </button>
      </section>
      <article className="w-full mt-[3.5vw] sm:mt-[2.5vw] lg:mt-[1.5vw] border-t-[1px] border-gray-300">
        {features &&
          features.map((item, index) => (
            <section
              key={index}
              className="flex items-center mt-[5vw] sm:mt-[2vw] lg:mt-[1vw]"
            >
              <CheckCircleOutlineIcon className="text-[#FF387A] text-[4.3vw] sm:text-[2.3vw] lg:text-[1.3vw]" />
              <p className="text-[4vw] sm:text-[2vw] lg:text-[1vw] font-medium text-[#171717] ml-[0.5vw]">
                {item}
              </p>
            </section>
          ))}
        <button
          className="bg-[#FF387A] text-[4vw] sm:text-[2vw] lg:text-[1vw] mt-[6vw] sm:mt-[4vw] lg:mt-[2vw] hover:shadow-md hover:bg-[#ff387af1] text-[#fff] p-[2.5vw] md:p-[0.9vw] rounded-md w-full text-center"
          onClick={paymentMethod}
        >
          Select Plan
        </button>
      </article>
      <div id="paypal-button-container"></div>
    </main>
  );
};

export default SubscriptionCard;
