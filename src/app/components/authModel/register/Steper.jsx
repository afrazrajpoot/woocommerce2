"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

const steps = ["Detail", "Payment Method", "Review"];

// Custom StepIcon component
const StepIcon = (props) => {
  const { active, completed, icon } = props;

  const icons = {
    1: "/img/seperatorBtn1.png", // Replace with your image paths
    2: "/img/icon2.png",
    3: "/img/seperatorBtn3.png",
  };

  return (
    <div>
      <img
        src={icons[icon]}
        alt={`Step ${icon}`}
        style={{
          filter: active || completed ? "none" : "grayscale(100%)",
        }}
      />
    </div>
  );
};

export default function Steper() {
  return (
    <Box className=" lg:w-[100%]  w-[113vw] sm:w-[125vw] sm:ml-[-10vw] ml-[-4vw] lg:ml-[0vw]">
      <Stepper alternativeLabel>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel StepIconComponent={StepIcon}>
              <p className="lg:text-[1vw] sm:text-[1.5vw] sm:mt-[1vw] text-[3vw] mt-[-2vw] lg:mt-[0vw]">
                {label}
              </p>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
