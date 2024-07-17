"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { headerData } from "@/data/data";
import { useGlobalContext } from "@/context/globalState";
import { styled } from "@mui/material/styles";
import { useSession } from "next-auth/react";

const Header = () => {
  const { data: session } = useSession();
  const {
    login,
    setLoginModel,
    toggleSidebar,
    cartCount,
    setSignupModel,
    showCart,
    logedUsername,customerDetails
  } = useGlobalContext();

  const [userName, setUserName] = useState("Guest");

  const CustomButton = styled(Button)({
    color: "white",
    borderColor: "white",
    borderWidth: "1px",
    textTransform: "capitalize",
  });

  const filteredHeaderData = !login
    ? headerData.filter((item, index) => index !== 3)
    : headerData;

  useEffect(() => {
    if(customerDetails) {
      setUserName(customerDetails?.username);
    }
    if (session?.user?.name) {
      setUserName(session.user.name);
    } 
  }, [session]);

  return (
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

      {login || session ? (
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
              <span>{logedUsername?.split(" ")[0] || userName?.split(" ")[0] || "Guest"}</span>
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
  );
};

export default Header; 
// https://develop.sonduckfilm.com/?download_file=50844&order=wc_order_LivIl9iy15Qr7&email=hodilysy%40mailinator.com&key=9a1b8ddd-abba-4e66-9476-987167584cc8

// https://develop.sonduckfilm.com/?download_file=50844&order=wc_order_LivIl9iy15Qr7&email=hodilysy%40mailinator.com&key=397c1d64-c7a5-4e30-96bc-43ec266182ab

// https://develop.sonduckfilm.com/?download_file=50501&order=wc_order_BtLhRoi3oRpXp&email=hodilysy%40mailinator.com&key=397c1d64-c7a5-4e30-96bc-43ec266182ab

// https://drive.google.com/file/d/1tk-iYDv9u4yv6wxnGzsqck5n29yWlQCE/view