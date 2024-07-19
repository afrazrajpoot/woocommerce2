"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { useRouter } from "next/navigation";

const steps = ["Detail", "Payment Method", "Review"];

const StepIcon = (props) => {
  const { active, completed, icon, isActive } = props;
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
          filter: isActive || active || completed ? "none" : "grayscale(100%)",
        }}
      />
    </div>
  );
};

const Steper = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = React.useState(0);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const currentUrl = window.location.href;
      console.log("Current URL:", currentUrl);
      if (currentUrl.includes("/checkout")) {
        setCurrentStep(1);
      } else if (currentUrl.includes("/review")) {
        setCurrentStep(2);
      } else {
        setCurrentStep(0);
      }
    }
  }, [router.asPath]);

  return (
    <Box className="lg:w-[100%] w-[113vw] sm:w-[125vw] sm:ml-[-10vw] ml-[-4vw] lg:ml-[0vw]">
      <Stepper activeStep={currentStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel
              StepIconComponent={(props) => (
                <StepIcon {...props} isActive={index === currentStep} />
              )}
            >
              <p className="lg:text-[1vw] sm:text-[1.5vw] sm:mt-[1vw] text-[3vw] mt-[-2vw] lg:mt-[0vw]">
                {label}
              </p>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default Steper;
