"use client";
import React from "react";

const Pricing = ({ plan, price, desc, info1, info2, info3 }) => {
  return (
    <main className="w-full  h-[95vw] lg:h-[35vw] max-w-[80vw] lg:max-w-[25vw] ">
      <section
        className={`flex flex-col p-[4vw]  lg:p-[1vw]  gap-[5vw] lg:gap-[1.5vw] ${
          plan === "MONTHLY" && "bg-white"
        } ${plan === "40 PACK BUNDLE" ? "bg-[#FF387A] text-white" : ""}  ${
          plan === "Annual" && "bg-black"
        } rounded-xl shadow-lg `}
        style={{ width: "100%", height: "100%" }}
      >
        <h2
          className={`lg:text-[1.3vw] text-[4vw] font-medium ${
            plan === "MONTHLY" ? "text-[#FF387A]" : "text-white"
          }`}
        >
          {plan}
        </h2>
        <div
          className={`flex gap-[1vw] items-center ${
            plan === "MONTHLY"
              ? "w-full max-w-[13vw]"
              : "w-full lg:max-w-[13vw]"
          }`}
        >
          <h3
            className={`text-[4vw] lg:text-[2.5vw] font-bold ${
              price === "$25" ? "text-[#FF387A]" : "text-white"
            }`}
          >
            {price}
          </h3>
          <p
            className={`lg:text-[1.3vw] text-[4vw] ${
              plan === "MONTHLY" ? "text-black" : "text-white"
            }`}
          >
            {desc}
          </p>
        </div>
        <button
          className={`lg:p-[0.6vw] p-[2vw] text-[2.5vw] lg:text-[1.3vw] font-medium lg:rounded-md ${
            plan === "MONTHLY"
              ? "bg-[#FF387A] text-white"
              : "bg-white text-[#FF387A]"
          }`}
        >
          Buy Now
        </button>
        <div
          className="border-b-[#E5E7EB] border-b-[1px]"
          style={{ width: "100%" }}
        ></div>
        <p
          className={`text-[3vw] lg:text-[1vw] ${
            plan === "MONTHLY" ? "text-black" : "text-white"
          }`}
        >
          <span
            className={`text-[#FF387A] font-medium text-[3vw] lg:text-[1.5vw] ${
              plan === "40 PACK BUNDLE" && "text-white"
            }`}
          >
            ✓
          </span>
          {info1}
        </p>
        <div
          className="border-b-[#E5E7EB] border-b-[1px]"
          style={{ width: "100%" }}
        ></div>

        <p
          className={`text-[3vw]  lg:text-[1vw] ${
            plan === "MONTHLY" ? "text-black" : "text-white"
          }`}
        >
          <span
            className={`text-[#FF387A] font-medium text-[3vw] lg:text-[1.5vw] ${
              plan === "40 PACK BUNDLE" && "text-white"
            }`}
          >
            ✓
          </span>
          {info2}
        </p>
        <div
          className="border-b-[#E5E7EB] border-b-[1px]"
          style={{ width: "100%" }}
        ></div>

        <p
          className={`text-[3vw] lg:text-[1vw] ${
            plan === "MONTHLY" ? "text-black" : "text-white"
          }`}
        >
          <span
            className={`text-[#FF387A] font-medium text-[3vw] lg:text-[1.5vw] ${
              plan === "40 PACK BUNDLE" && "text-white"
            }`}
          >
            ✓
          </span>
          {info3}
        </p>
      </section>
    </main>
  );
};

export default Pricing;