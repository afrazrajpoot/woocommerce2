"use client";
import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { faqCardData, faqData } from "@/data/data";
import Footer from "../components/Common/Footer/Footer";
import FaqCard from "../components/Cards/FaqCard";

export default function DisabledAccordion() {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <main className="bg-[#FAFAFA]">
      <section className="lg:translate-y-[5vw] translate-y-[18vw] sm:translate-y-[10vw] pb-[4vw]">
        <article className="w-full max-w-[80vw] m-auto">
          <button className="border-[1px] border-[#FF689A] sm:text-[1.5vw] bg-[#ff689a34] p-[0.6vw] rounded-lg text-[#FF689A] lg:mt-[1vw] lg:text-[1vw] text-[3vw]">
            Tutorials
          </button>
          <h1 className="lg:text-[2vw] text-[5vw] font-bold mt-[5vw]  sm:text-[3vw] sm:mt-[4vw] ">
            Frequently Asked Questions
          </h1>
          <p className="mt-[5vw] lg:text-[1vw] text-[3vw] sm:text-[2vw] sm:mt-[3vw]">
            We understand that you may have some questions about sunduckfilm. We
            have compiled a list of frequently asked questions to help you get
            the information you need. If you have any other questions, please do
            not hesitate to contact us.
          </p>
        </article>
        <article className="w-full max-w-[80vw] m-auto flex flex-col gap-[4vw] mt-[5vw] sm:gap-[5vw] sm:mt-[4vw]">
          {faqData?.map((item, index) => (
            <Accordion
              key={index}
              expanded={expanded === index}
              onChange={handleChange(index)}
              className="rounded-lg"
            >
              <AccordionSummary
                expandIcon={expanded === index ? <RemoveIcon /> : <AddIcon />}
                aria-controls={`panel${index}-content`}
                id={`panel${index}-header`}
              >
                <Typography className="lg:text-[1vw] text-[3vw] p-[0.8vw] sm:text-[2vw] font-bold">
                  {item.title}
                </Typography>
              </AccordionSummary>
              <AccordionDetails className="flex lg:flex-row  flex-col items-start gap-[1vw]">
                <img src={item.img} alt={item.title} className="" />
                <Typography className="lg:text-[1vw] text-[3vw]">
                  {item.desc}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </article>
        <article className="lg:mt-[9vw] mt-[20vw] sm:mt-[5vw] bg-white sm:pb-[8vw] lg:pb-[6vw] pt-[2vw] ">
          <h1 className="font-bold lg:text-[2vw] text-[6vw] text-center sm:text-[3vw]">
            What they say
          </h1>
          <p className="text-center lg:w-[27vw] w-[99vw] m-auto text-[#525252] font-medium mt-[4vw] sm:w-[50vw]">
            Hear from our satisfied clients and learn how we've helped them take
            their businesses to new heights.
          </p>
          <figure className="flex justify-center mt-[4vw] sm:mt-[4vw]">
            <img src="/img/brands.png" alt="brands images" />
          </figure>
          <main className="flex lg:flex-row flex-col  sm:flex-row w-full max-w-[65vw] mt-[4vw]   m-auto lg:gap-[3vw] gap-[8vw] sm:mt-[4vw]">
            {faqCardData?.map((item, index) => (
              <FaqCard key={index} {...item} />
            ))}
          </main>
        </article>
      </section>
      <footer className="lg:translate-y-[1vw] translate-y-[25vw] sm:translate-y-[5vw] ">
        <Footer />
      </footer>
    </main>
  );
}
