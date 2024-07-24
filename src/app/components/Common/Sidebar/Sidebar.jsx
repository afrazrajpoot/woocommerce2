"use client";
import { useGlobalContext } from "@/context/globalState";
import { menueData, otherData } from "@/data/data";
import { Avatar } from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Sidebar = () => {
  const session = useSession();
  const [image, setImage] = useState();
  const { customerDetails, logout, siderbarImage } = useGlobalContext();
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

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setImage(userData?.user?.img);
  }, [siderbarImage]);

  // console.log(image, "my");

  return (
    <aside className="fixed translate-x-[5vw] top-[3vw] hidden lg:block overflow-y-auto h-screen w-full max-w-[20vw] lg:max-w-[17vw] bg-white border-[1px] border-[#F1F5F9]">
      <div className="flex items-start gap-[0.4vw] px-[1vw] py-[3vw]">
        <Avatar className="">
          {session.data?.user?.image ? (
            <img
              src={session.data.user.image}
              alt="user"
              className="w-[3vw] h-[3vw] object-cover rounded-full"
            />
          ) : (
            image && (
              <img
                src={image}
                alt="user"
                className="w-[3vw] h-[3vw] object-cover rounded-full"
              />
            )
          )}
        </Avatar>
        <div>
          <p className="font-bold text-[1vw]">{customerDetails?.username}</p>
          <p className="text-[#64748B] text-[0.7vw] sm:text-[1vw] mt-[-0.2vw]">
            {customerDetails?.email}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-[4vw] px-[1vw] pb-[1vw]">
        <div className="flex flex-col gap-[1vw]">
          <p className="font-bold lg:text-[0.9vw] sm:text-[1.5vw] text-[2.5vw] text-[#334155]">
            Menu
          </p>
          <div className="flex flex-col gap-[1vw] ml-[1vw]">
            {menueData?.map((item, index) => (
              <Link
                href={item.link}
                key={index}
                className="flex items-center hover:bg-[#F6F6F6] p-[0.5vw] rounded-md gap-[0.4vw]"
              >
                <img src={item.icon} alt="img" className="w-[1vw] h-[1vw]" />
                <p className="lg:text-[0.9vw] text-[2.5vw] sm:text-[1vw] text-[#334155]">
                  {item.title}
                </p>
              </Link>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-[1vw]">
          <p className="font-bold lg:text-[0.9vw] sm:text-[1.5vw] text-[#334155]">
            Others
          </p>
          <div className="flex flex-col gap-[1vw] ml-[1vw]">
            {otherData?.map((item, index) => (
              <Link
                href={item.link}
                key={index}
                className="flex items-center gap-[0.4vw]"
              >
                <img src={item.icon} alt="" className="w-[1vw] h-[1vw]" />
                <p
                  className={`text-[0.9vw] text-[#334155] ${
                    index === 2 && "text-[#ED544E]"
                  }`}
                >
                  {item.title}
                </p>
              </Link>
            ))}
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
