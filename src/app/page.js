"use client";
import { TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MotionDuck from "./components/pagesComponents/landingpage/MotionDuck";
import SubscriptionPass from "./components/pagesComponents/landingpage/SubscriptionPass";
import Categories from "./components/pagesComponents/landingpage/Categories";
import SubscriptionPlains from "./components/pagesComponents/landingpage/SubscriptionPlains";
import Image from "next/image";
import { profileData } from "@/data/data";
import Profile from "./components/Cards/Profile";
import Footer from "./components/Common/Footer/Footer";
import Bundles from "./components/pagesComponents/landingpage/Bundles";
import { useGlobalContext } from "@/context/globalState";
import InputField from "./components/InputField";

const LandingPage = () => {
  return (
    <main
      style={{ backgroundImage: "url('/img/hero1.png')" }}
      className="w-full h-screen bg-cover bg-center"
    >
      <aside className="pt-[20vw] sm:pt-[10vw] lg:pt-[6vw] ml-[6vw] md:ml-[9vw] mt-[8vw] md:mt-0 w-full max-w-[90vw]  md:max-w-[50vw] p-[1vw]">
        <button className="bg-[#3D3D3D] text-[4vw] sm:text-[2vw] lg:text-[1vw] hover:bg-[#333333] text-[#fff] p-[2.5vw] md:p-[0.6vw] rounded-full w-full max-w-[35vw] sm:max-w-[18vw] lg:max-w-[10vw] text-center">
          SONDUCKFILM
        </button>
        <p className="gradient-text mt-[5vw] w-full text-[12vw] lg:text-[4.5vw] font-bold leading-[12vw] lg:leading-[4.5vw] sm:mt-[2vw] sm:text-[5vw] sm:leading-[5vw] lg:mt-[1vw] ">
          Get Access to Hundreds <span>Motion</span> <span>Graphics</span>{" "}
          Available
        </p>
        <p className="w-full text-[4vw] mt-[3vw] sm:text-[2vw] lg:text-[1vw] md:mt-[1vw] text-[#B0B0B0] sm:max-w-[40vw] lg:max-w-[30vw]">
          Find what you need on Sonduck Film, Discover millions of video
          templates, stock footage, audio & more. All for one low cost.
        </p>
        <section className="flex flex-col justify-center md:justify-normal md:flex-row items-center mt-[4vw] sm:mt-[3vw] lg:mt-[1vw]">
          <InputField />
        </section>
      </aside>
      <section className="w-full mt-[22vw] sm:mt-[6vw] lg:mt-[2vw] max-w-[80vw] mx-auto">
        <MotionDuck />
      </section>
      <section className="w-full mt-[10vw] md:mt-[4vw] max-w-[80vw] mx-auto">
        <SubscriptionPass />
      </section>
      <section className="w-full mt-[10vw] md:mt-[4vw] bg-[#F8F8F8]">
        <Categories />
      </section>
      <section className="w-full mt-[10vw] md:mt-[0vw] bg-[#ffff]">
        <Bundles />
      </section>
      <section className="w-full mt-[10vw] sm:mt-[6vw] lg:mt-[2vw] bg-[#F8F8F8]">
        <SubscriptionPlains />
      </section>
      <article className="w-full relative flex flex-col items-center justify-center mt-[10vw] sm:mt-[6vw] lg:mt-[2vw] py-[6vw] md:py-[2vw] bg-[#171717]">
        <img
          src={"/img/duck1.png"}
          alt="hero2"
          className="absolute w-full max-w-[13vw] top-[2vw] right-0"
        />
        <img
          src={"/img/duck2.png"}
          alt="hero2"
          className="absolute w-full max-w-[13vw] top-[15vw] left-0"
        />
        <h1 className="text-[5.5vw] sm:text-[3.5vw] lg:text-[2.5vw] mt-[2vw] font-semibold text-[#fff] text-center">
          Unlock Your Potential as a <br />{" "}
          <span className="text-[#FF689A]">Creator</span> with Sonduck
        </h1>
        <p className="text-[3.8vw] sm:text-[1.8vw] lg:text-[0.8vw] mt-[1vw] text-[#D4D4D4] text-center w-full max-w-[80vw] sm:max-w-[70vw] lg:max-w-[47vw]">
          Experience the collaboration of numerous creators and an expanding
          selection of courses. Register now and become a part of a community
          comprising over 10,000 local and international creators. Utilize our
          Course Editor, and showcase your expertise by publishing your finest
          course on the Sonduck Course Library.
        </p>
        <button className="bg-[#FF387A] text-[4vw] sm:text-[2vw] lg:text-[1vw] ml-[1vw] hover:shadow-md hover:bg-[#ff387af1] text-[#fff] p-[2.5vw] md:p-[0.9vw] mt-[5vw] md:mt-[2vw] rounded-md w-full max-w-[30vw] sm:max-w-[15vw] lg:max-w-[10vw] text-center">
          Browse All
        </button>
        <Image
          src={"/img/Desktop.png"}
          alt="hero2"
          width={1250}
          height={300}
          className="mt-[4vw]"
        />
      </article>
      <section className="w-full py-[6vw] sm:py-[4vw] lg:py-[2vw] bg-[#F6F6F6]">
        <article className="w-full flex flex-col md:flex-row justify-between mt-[3vw] max-w-[75vw] mx-auto">
          <h1 className="text-[5.5vw] sm:text-[3vw] lg:text-[2vw] leading-[6vw] md:leading-[3vw] font-semibold text-[#171717]">
            Discover What Our <br /> Community Is Saying
          </h1>
          <p className="text-[#525252] mt-[3vw] md:mt-0 text-[4vw] sm:text-[2vw] lg:text-[1vw] w-full max-w-[80vw] sm:max-w-[45vw] lg:max-w-[35vw]">
            At Sonduck, our vibrant community of learners and creators is at the
            heart of what we do. Hear directly from those who have experienced
            the transformative journey of learning and creating on our platform.
            Explore testimonials that reflect the diverse perspectives of
            enthusiastic learners and accomplished creators.
          </p>
        </article>
        <figure className="w-full  max-w-[80vw] mx-auto my-[5vw] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[10vw] sm:gap-[5vw] lg:gap-[2vw] place-items-center place-content-center">
          {profileData?.map((user, index) => (
            <Profile key={index} {...user} />
          ))}
        </figure>
      </section>
      <Footer />
    </main>
  );
};

export default LandingPage;
