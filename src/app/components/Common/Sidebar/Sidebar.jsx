"use client";
import { useGlobalContext } from "@/context/globalState";
import { menueData, otherData } from "@/data/data";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Sidebar = () => {
  const session = useSession();
  const { customerDetails, logout } = useGlobalContext();
  const navigate = useRouter();

  function handleLogout() {
    if (session.data) {
      signOut("google");
      navigate.push("/");

      return;
    }
    logout();
    navigate.push("/");
  }

  return (
    <aside className="fixed  top-[3vw] hidden lg:block ">
      <div className="flex items-start gap-[0.4vw] bg-white  border-[1px] border-[#F1F5F9] w-full max-w-[20vw] lg:max-w-[17vw] ml-[8vw] sm:w-[45vw]  px-[1vw] py-[3vw]">
        <figure className="w-full max-w-[3.5vw]">
          <img src="/img/avatar.png" alt="" className="w-full" />
        </figure>

        <div>
          <p className="font-bold text-[1vw] ">{customerDetails?.username}</p>
          <p className="text-[#64748B] text-[0.7vw]  sm:text-[1vw]  mt-[-0.2vw]">
            {customerDetails?.email}
          </p>
        </div>
      </div>
      <div className="h-screen  w-full bg-white  fixed  sm:max-w-[20vw] lg:max-w-[17vw] ml-[8vw] p-[1vw] flex flex-col gap-[4vw]">
        <div className="flex flex-col gap-[1vw]">
          <p className="font-bold lg:text-[0.9vw] sm:text-[1.5vw] text-[2.5vw] text-[#334155] ">
            Menu
          </p>
          <div className="flex flex-col gap-[1vw]  ml-[1vw]">
            {menueData?.map((item, index) => {
              return (
                <Link
                  href={item.link}
                  key={index}
                  className="flex items-center hover:bg-[#F6F6F6] p-[0.5vw] rounded-md gap-[0.4vw]"
                >
                  <img src={item.icon} alt="" className="w-[1vw] h-[1vw]" />
                  <p
                    // to={item?.link}
                    className="lg:text-[0.9vw] text-[2.5vw] sm:text-[1vw] text-[#334155] "
                  >
                    {item.title}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col gap-[1vw]">
          <p className="font-bold lg:text-[0.9vw] sm:text-[1.5vw]  text-[#334155]">
            Others
          </p>
          <div className="flex flex-col gap-[1vw] ml-[1vw]">
            {otherData?.map((item, index) => {
              return (
                <Link
                  href={item?.link}
                  // onClick={!item?.link && handleLogout()}
                  key={index}
                  className="flex items-center gap-[0.4vw]"
                >
                  <img src={item.icon} alt="" className="w-[1vw] h-[1vw]" />
                  <p
                    // to={item.link}
                    className={`text-[0.9vw] text-[#334155] ${
                      index === 2 && "text-[#ED544E]"
                    }`}
                  >
                    {item.title}
                  </p>
                </Link>
              );
            })}
            <article className="flex gap-[1vw]">
              <figure>
                <img src="/img/logoutIcon.png" alt="logout icon" />
              </figure>
              <div>
                <button className="text-red-500" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </article>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
