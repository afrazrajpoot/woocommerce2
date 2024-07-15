"use client";
import Image from "next/image";
import React from "react";
import Categories from "../components/pagesComponents/landingpage/Categories";
import SubscriptionPlains from "../components/pagesComponents/landingpage/SubscriptionPlains";
import { profileData } from "@/data/data";
import Profile from "../components/Cards/Profile";
import Questions from "../components/pagesComponents/subscriptionPage/Questions";
import Footer from "../components/Common/Footer/Footer";
import Pricing from "../components/pagesComponents/landingpage/Pricing";
import Motion from "../components/Common/Motion";

const Subscription = () => {
  const pricingData = [
    {
      plan: "Annual",
      price: "$180",
      desc: "USD/year,billed annually",
      info1: "Install on up to 2 computers at a time.",
      info2: "Get Access to Every Pack + Future Packs",
      info3: "*Currency will update at checkout based on your location.",
    },
    {
      plan: "MONTHLY",
      price: "$25",
      desc: "USD/mo per month",
      info1: "Install on up to 2 computers at a time.",
      info2: "Get Access to Every Pack + Future Packs",
      info3: "+ $15 sign",
    },
    {
      plan: "40 PACK BUNDLE",
      price: "$180",
      desc: "USD one-timepayment",
      info1: "Install on up to 2 computers at a time.",
      info2: "Get Access to Every Pack + Future Packs",
      info3: "*Currency will update at checkout based on your location.",
    },
  ];
  const motionDuckData = [
    {
      tick: "/img/tick-circle.png",
      info1: "BROWSE AND PREVIEW EVERY TEMPLATE",
      info2: "APPLY WITHIN ONE CLICK",
      info3: "THEN UPDATE YOUR TEMPLATE",
      img: "/img/m1.png",
    },
    {
      img: "/img/m2.png",
      tick: "/img/tick-circle.png",
      info1: "DOWNLOAD EVERY PACK IN THE EXTENSION",
      info2: "NO NEED TO LEAVE AE OR PREMIERE",
      info3: "INSTANT INSTALL",
    },
  ];
  return (
    <>
      <main
        style={{ backgroundImage: "url('/img/BG.png')" }}
        className="w-full bg-cover bg-center "
      >
        <article className="flex w-full flex-col justify-center py-[6vw] items-center lg:mt-[0vw] mt-[10vw]">
          <h1 className="gradient-text text-[8vw] md:text-[4vw] font-bold ">
            Subscription
          </h1>
          <Image
            src={"/img/subscription.png"}
            className="mt-[3vw]"
            width={1100}
            height={1000}
          />
          <footer className="flex flex-col lg:absolute lg:top-[35vw] md:flex-row items-start shadow-lg  justify-between p-[2vw] bg-[#ffff] w-full max-w-[80vw] rounded-lg lg:mt-[0vw] mt-[10vw]">
            <section className="w-full md:max-w-[35vw]">
              <h2 className="text-[4.3vw] md:text-[1.3vw] text-[#171717] text-center font-medium">
                What is MotionDuck?
              </h2>
              <img
                src={"/img/card1.png"}
                className="mt-[3vw] rounded-lg w-full h-[30vw] md:h-[20vw]"
              />
            </section>
            <section className="w-full t-[4vw] md:mt-0 md:max-w-[35vw]">
              <h2 className="text-[4.3vw] md:text-[1.3vw] text-[#171717] text-center font-medium">
                Subscription Walkthrough
              </h2>
              <img
                src={"/img/card2.png"}
                className="mt-[3vw] rounded-lg w-full h-[30vw] md:h-[20vw]"
              />
            </section>
          </footer>
        </article>
      </main>
      <section className="lg:absolute mt-[10vw] lg:mt-[5vw] lg:top-[70vw]  w-full">
        <h1 className="text-center font-bold text-[5vw] lg:text-[2.4vw]">
          Pricing
        </h1>
        <div className="flex lg:flex-row flex-col gap-[6vw] items-center lg:items-start  justify-center mt-[3vw]">
          {pricingData.map((data, index) => (
            <Pricing key={index} {...data} />
          ))}
        </div>
      </section>
      <section className="lg:absolute lg:top-[120vw] mt-[10vw] lg:mt-[0vw]  w-full ">
        <h1 className="text-center font-bold text-[5vw] md:text-[2.4vw]">
          What is MotionDuck?
        </h1>
        <div className=" mt-[3vw] p-[2vw]">
          {motionDuckData.map((data, index) => (
            <Motion key={index} {...data} />
          ))}
        </div>
      </section>
      <section className="lg:absolute lg:top-[170vw] mt-[10vw] lg:mt-[0vw]  w-full lg:ml-[0vw] ml-[0.5vw]">
        <h1 className="text-center font-bold text-[5vw] lg:text-[2.4vw]">
          Save time
        </h1>
        <div className="w-full lg:max-w-[40vw] mx-auto h-[60vh] max-w-[95vw] ">
          <iframe
            src="https://www.youtube.com/embed/KqhARH_JaPE?si=systEFIA4suGJ5bO"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
            className="mx-auto mt-[2vw] w-full h-full rounded-xl shadow-md"
          ></iframe>
        </div>
      </section>
      <section className="lg:absolute lg:top-[210vw] mt-[10vw] lg:mt-[0vw] w-full">
        <figure className="lg:ml-[15vw]">
          <img src="/img/feature.png" alt="feature" />
        </figure>
      </section>
      <section className="w-full mt-[10vw] md:mt-[2vw] bg-[#F8F8F8] lg:mt-[230vw]">
        <Categories />
      </section>
      <section className="w-full mt-[10vw] md:mt-[2vw] bg-[#F8F8F8]">
        <SubscriptionPlains />
      </section>
      <section className="w-full mt-[10vw] md:mt-[2vw] bg-[#171717]">
        <Questions />
      </section>
      <section className="w-full py-[6vw] md:py-[2vw] bg-[#F6F6F6]">
        <article className="w-full flex flex-col md:flex-row justify-between mt-[3vw] max-w-[75vw] mx-auto">
          <h1 className="text-[5.5vw] md:text-[2vw] leading-[6vw] md:leading-[3vw] font-semibold text-[#171717]">
            Discover What Our <br /> Community Is Saying
          </h1>
          <p className="text-[#525252] mt-[3vw] md:mt-0 text-[4vw] md:text-[1vw] w-full max-w-[80vw] md:max-w-[35vw]">
            At Sonduck, our vibrant community of learners and creators is at the
            heart of what we do. Hear directly from those who have experienced
            the transformative journey of learning and creating on our platform.
            Explore testimonials that reflect the diverse perspectives of
            enthusiastic learners and accomplished creators.
          </p>
        </article>
        <figure className="w-full  max-w-[80vw] mx-auto my-[5vw] grid grid-cols-1 md:grid-cols-3 gap-[10vw] md:gap-[2vw] place-items-center place-content-center">
          {profileData?.map((user, index) => (
            <Profile key={index} {...user} />
          ))}
        </figure>
      </section>
      <Footer />
    </>
  );
};

export default Subscription;
