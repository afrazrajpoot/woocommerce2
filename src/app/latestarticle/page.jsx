// import Footer from "@/components/Footer";
import { categoriesData, latestArticledata } from "@/data/data";
import { TextField } from "@mui/material";
import Image from "next/image";
import React from "react";
import Pagination from "../components/Common/Paggination";
import Footer from "../components/Common/Footer/Footer";

const Page = () => {

  const recentPosts = [
    {date: "22/06/2023", title:"The 10 Most Popular Title Animations in After Effects"},
    {date: "22/06/2023", title:"Create Cinematic Visuals in After Effects"},
    {date: "22/06/2023", title:"Bounce Expression"},
  ]

  return (
    <main className="bg-[#FAFAFA] pb-[2vw]">
      <section className="lg:translate-y-[5vw] translate-y-[20vw] sm:translate-y-[10vw]">
        <section className="w-full max-w-[75vw] m-auto">
          <button className="border-[1px] ml-[-8vw] lg:ml-[0vw]  border-[#FF689A] bg-[#ff689a34] p-[0.6vw] rounded-lg text-[#FF689A] mt-[1vw]">
            Tutorials
          </button>
          <h1 className="lg:text-[2vw] ml-[-8vw] lg:ml-[0vw]  text-[5vw] font-bold lg:mt-[1vw] sm:mt-[3vw] mt-[5vw] sm:text-[3vw]">
            Latest Articles
          </h1>
          <p className="lg:mt-[1vw] text-[3.5vw] lg:ml-[0vw] ml-[-9vw] lg:w-[50vw] w-[95vw] lg:text-[1vw] sm:text-[2vw]  mt-[3vw]">
            We understand that you may have some questions about sunduckfilm. We
            have compiled a list of frequently asked questions to help you get
            the information you need. If you have any other questions, please do
            not hesitate to contact us.
          </p>
          <article className="lg:hidden w-[93vw] ml-[-9vw]">
            <form className="border-[1px] mt-[9.5vw] border-[#D4D4D4] bg-[#F5F5F5] flex gap-[1vw]  p-[2vw] rounded-lg ">
              <img src="/img/blackSearch.png" alt="search" />
              <input
                type="text"
                placeholder="search"
                className="bg-[#F5F5F5] focus:outline-none"
                name=""
                id=""
              />
            </form>
            <h2 className="text-[5vw] font-bold mt-[6.5vw] ml-[0.4vw] sm:text-[3vw]">
              Categories
            </h2>
            <div className="border-[0.7px] border-b-[#E5E5E5] mt-[5vw]"></div>
            {categoriesData?.map((elem, ind) => (
              <div key={ind}>
                <div className="flex justify-between">
                  <h3 className="mt-[3vw] ml-[0.4vw] text-[4vw] font-medium sm:text-[2.5vw]">
                    {elem.title}
                  </h3>
                  <p className="mt-[3vw] text-[#FF689A] text-[3.5vw] sm:text-[1.9vw]">
                    {elem.desc}
                  </p>
                </div>
                <div className="border-[0.7px] border-b-[#E5E5E5] mt-[3vw]"></div>
              </div>
            ))}
          </article>
          <article className="flex  mt-[8vw] sm:mt-[5vw]">
            <section className="">
              <article className="flex flex-col gap-[6vw]">
                {latestArticledata?.map((item, index) => (
                  <div
                    key={index}
                    className="flex lg:flex-row flex-col gap-[1vw]"
                  >
                    <figure className="w-[95vw] lg:w-[30vw] sm:ml-[6vw] ml-[-10vw] lg:ml-[0vw] sm:w-[65vw]">
                      <img src={item.img} alt={item.title} className="w-full" />
                    </figure>
                    <div className="mt-[0.8vw] sm:ml-[15vw] lg:ml-[0vw]">
                      <h1 className="font-bold text-[4.5vw] sm:text-[2.5vw] lg:ml-[0vw] lg:text-[1vw] w-full lg:max-w-[18vw] max-w-[75vw] ml-[-7vw] text-[#171717]">
                        {item.title}
                      </h1>
                      <p className="lg:text-[0.9vw] text-[3vw] lg:ml-[0vw] sm:text-[2vw] ml-[-6vw] mt-[0.6vw] font-medium text-[#525252]">
                        {item.date}{" "}
                        <span className="text-[#FF689A] ">Erin Bator</span>
                      </p>
                      <p className="lg:text-[0.9vw] text-[3.5vw] w-full sm:text-[2vw] max-w-[75vw] lg:ml-[0vw] ml-[-6vw] lg:max-w-[25vw] mt-[0.6vw] text-[#171717] ">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </article>
            </section>
            <section className="ml-[10vw] hidden lg:block">
              <article>
                <form>
                  <TextField
                    id="outlined-basic"
                    placeholder="Search..."
                    InputProps={{
                      startAdornment: (
                        <Image
                          src={"/img/blackSearch.png"}
                          height={20}
                          width={20}
                          style={{ marginRight: "10px" }}
                          className="lg:block hidden"
                          alt="Search Icon"
                        />
                      ),
                      className:
                        "text-[#A3A3A3] bg-[#FAFAFA] p-[0.3vw] focus:outline-none rounded-lg placeholder:text-[#A3A3A3] border-[1px] border-[#FAFAFA] w-[20vw]",
                      style: { padding: "0.3vw" },
                    }}
                    sx={{
                      "& input": {
                        padding: "0.3vw",
                      },
                    }}
                  />
                </form>
                <h2 className="text-[1.5vw] font-bold mt-[2vw] ml-[0.4vw]">
                  Recent Posts
                </h2>
                {recentPosts?.map((post, index) => (
                  <main key={index}>
                     <div className="mt-[1vw] ml-[0.4vw]">
                  <p className="text-[#525252] text-[1vw]">{post?.date}</p>
                  <p className="text-[1vw] font-medium">
                   {post?.title}
                  </p>
                </div>
                <div className="border-[0.7px] border-b-[#E5E5E5] mt-[1vw]"></div>
                  </main>
                ))}
                <h2 className="text-[1.5vw] font-bold mt-[2vw] ml-[0.4vw]">
                  Categories
                </h2>
                <div className="border-[0.7px] border-b-[#E5E5E5] mt-[1vw]"></div>
                {categoriesData?.map((elem, ind) => (
                  <div key={ind}>
                    <div className="flex justify-between">
                      <h3 className="mt-[1vw] ml-[0.4vw] text-[1vw] font-medium">
                        {elem.title}
                      </h3>
                      <p className="mt-[1vw] text-[#FF689A]">{elem.desc}</p>
                    </div>
                    <div className="border-[0.7px] border-b-[#E5E5E5] mt-[1vw]"></div>
                  </div>
                ))}
              </article>
            </section>
          </article>
        </section>
      </section>
      <Pagination />
      <article className="lg:hidden">
        <h2 className="text-[5vw] font-medium mt-[9vw] ml-[4.5vw] sm:text-[3vw]">
          Recent Posts
        </h2>
        {recentPosts?.map((post, index) => (
          <main className="" key={index}>
          <div className="mt-[1vw] ml-[5.5vw]">
          <p className="text-[#525252] text-[3vw] mt-[4vw] sm:text-[2vw]"> {post?.date} </p>
          <p className="text-[4vw] font-medium w-[75vw] mt-[3vw] sm:text-[2.5vw]">  {post?.title} </p>
        </div>
        <div className="border-[0.7px] border-b-[#E5E5E5] mt-[3vw] w-[88vw] m-auto"></div>
          </main>
        ))}
        </article>
      <footer className="translate-y-[10vw]">
        <Footer />
      </footer>
    </main>
  );
};

export default Page;
