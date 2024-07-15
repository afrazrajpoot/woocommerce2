"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { headerData } from "@/data/data";
import { useGlobalContext } from "@/context/globalState";
import { styled } from "@mui/material/styles";
import { useSession } from "next-auth/react";

const Header = () => {
  const session = useSession();
  const {
    login,
    setLoginModel,
    toggleSidebar,
    cartCount,
    setSignupModel,
    showCart,
  } = useGlobalContext();

  const [userName, setUserName] = useState("Guest");

  const CustomButton = styled(Button)({
    color: "white",
    borderColor: "white",
    borderWidth: "1px",
    textTransform: "capitalize",
  });

  useEffect(() => {
    if (session?.data) {
      setUserName(session?.data?.user?.name || "Guest");
    } else if (login) {
      setUserName(login?.data?.user?.fullName || "Guest");
    } else {
      setUserName("Guest");
    }
  }, [session, login]);

  const filteredHeaderData = !login
    ? headerData.filter((item, index) => index !== 3)
    : headerData;

  return (
    <>
      <nav className="bg-[#171717] top-0 w-full p-[2vw] lg:p-[0.7vw] sm:p-[1vw] justify-center flex items-center sm:justify-center lg:gap-[4vw] lg:justify-center gap-[8vw] fixed z-50">
        <Link href={"/"}>
          <figure className="w-full lg:max-w-[12vw] sm:max-w-[20vw] max-w-[60vw]">
            <img src={"/img/whiteDuck.png"} className="w-full" alt="logo" />
          </figure>
        </Link>
        <div className="lg:block hidden sm:block">
          <div className="lg:flex sm:flex gap-[4vw] text-[1vw] lg:text-[1vw] sm:text-[1.5vw]">
            {filteredHeaderData?.map((item, ind) => (
              <div className="text-[#FFFFFF]" key={ind}>
                <Link href={item.link}>{item.title}</Link>
              </div>
            ))}
          </div>
        </div>

        {login || session?.data ? (
          <div className="flex items-center gap-[0.3vw]">
            <span className="hidden lg:w-[10vw] lg:block">
              <form className="flex bg-[#262626] p-[0.6vw] lg:p-[0.6vw] rounded-md gap-[1vw] lg:w-[15vw]">
                <img src="/img/searchIcon.png" alt="searchIcon" />
                <input
                  type="text"
                  className="bg-[#262626] w-full focus:outline-none text-white"
                  name=""
                />
              </form>
            </span>
            <div className="bg-[#262626] relative sm:py-[1vw] lg:px-[0.5vw] px-[1vw] lg:py-[0.6vw] py-[2vw] transform translate-x-[-3.5vw] lg:translate-x-[5vw] rounded-lg">
              {cartCount > 0 && (
                <span className="absolute -top-[0.2vw] right-0 w-[1.2vw] h-[1.2vw] flex justify-center items-center bg-[#FF387A] rounded-full text-[0.6vw] font-medium text-center text-white">
                  {cartCount}
                </span>
              )}
              <img
                src={"/img/cart.png"}
                alt="cart"
                onClick={() => showCart(true)}
              />
            </div>
            <span className="lg:hidden" onClick={toggleSidebar}>
              <img src="/img/burger.png" alt="burger" />
            </span>
            <Link href={"/accountdetails"} className="hidden lg:block">
              <div className="px-[0.5vw] sm:w-[20vw] lg:w-[15vw] xl:w-[12vw] lg:translate-x-[5vw] w-[12vw] py-[0.6vw] bg-[#262626] rounded-lg flex items-center text-white font-bold gap-[1.5vw] lg:p-[0.4vw]">
                <img
                  src={"/img/profileIcon.png"}
                  alt="profile icon"
                  className="sm:w-[2vw] lg:w-[1.5vw]"
                />
                <span>{userName.split(" ")[0]}</span>
              </div>
            </Link>
          </div>
        ) : (
          <div className="lg:translate-x-[15vw] translate-x-1 flex gap-[2vw]">
            <Button
              onClick={() => setLoginModel(true)}
              variant="text"
              style={{ textTransform: "capitalize" }}
              className="text-white text-[3vw] lg:text-[1vw]"
            >
              Log <span className="ml-[0.3vw]">in</span>
            </Button>
            <CustomButton
              variant="outlined"
              className="lg:text-[1vw] text-[2vw]"
              onClick={() => setSignupModel(true)}
            >
              Join us
            </CustomButton>
          </div>
        )}
      </nav>
    </>
  );
};

export default Header;
