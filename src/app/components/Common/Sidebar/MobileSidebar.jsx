"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { useGlobalContext } from "@/context/globalState";
import { headerData, menueData, otherData } from "@/data/data";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export default function MobileSidebar() {
  const [image, setImage] = React.useState(null);
  const { session } = useSession();
  const { mobileSidebarOpen, toggleSidebar, customerDetails, logout } =
    useGlobalContext();

  const stopPropagation = (e) => {
    e.stopPropagation();
  };
  function handleLogout() {
    if (session.data) {
      signOut("google");
      return;
    }
    logout();
    navigate.push("/");
  }
  const DrawerList = (
    <Box
      className="w-full max-w-[90vw]"
      role="presentation"
      onClick={stopPropagation}
    >
      <header className="flex items-center gap-[35vw] w-full px-[3vw] mt-[6vw]">
        <section className="flex items-center gap-[1vw]">
          <figure className="">
            {session?.data?.user?.image ? (
              <img
                src={session.data.user.image}
                alt="user"
                className="w-[10vw] object-cover rounded-full"
              />
            ) : (
              image && (
                <img
                  src={image}
                  alt="user"
                  className="w-[10vw] object-cover rounded-full"
                />
              )
            )}
          </figure>
          <div>
            <p className="text-[4vw] sm:text-[2.5vw] font-bold ">
              {customerDetails?.username}
            </p>
            <p className="text-[#334155] text-[3vw] sm:text-[2vw] mt-[0.2vw]">
              {customerDetails?.email}
            </p>
          </div>
        </section>
        <section>
          <IconButton onClick={toggleSidebar}>
            <img src="/img/blackBurger.png" alt="burger" />
          </IconButton>
        </section>
      </header>
      <div className="mt-[5vw]">
        <Divider />
      </div>
      <form>
        <Box
          sx={{ display: "flex", alignItems: "center" }}
          className="border-[1px] border-[#E2E8F0] p-[1.5vw] mt-[5vw] sm:max-w-[70vw]   bg-[#F8FAFC] w-full max-w-[80vw] m-auto rounded-lg "
        >
          <img src="/img/mobileSearch.png" alt="" />
          <input
            type="text"
            name=""
            id=""
            className="w-full p-[0.5vw] focus:outline-none  bg-[#F8FAFC]"
            onClick={stopPropagation}
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
          />
        </Box>
      </form>

      <div className="flex flex-col gap-[3vw] ml-[7vw] mt-[7vw]">
        <p className="font-medium text-[3.5vw] sm:text-[3vw] text-[#334155] ">
          Menu
        </p>
        <div className="flex flex-col gap-[4vw] ml-[1vw]">
          {menueData?.map((item, index) => {
            return (
              <Link
                href={item.link}
                key={index}
                className="flex items-center gap-[2vw]"
              >
                <img src={item.icon} alt="" className="w-[4vw] sm:w-[3vw]" />
                <p
                  // to={item?.link}
                  className="text-[3vw] text-[#334155] sm:text-[2.5vw]"
                >
                  {item.title}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col gap-[3vw] ml-[7vw] mt-[7vw]">
        <p className="font-medium text-[3.5vw] text-[#334155] sm:text-[3vw] ">
          Other
        </p>
        <div className="flex flex-col gap-[4vw] ml-[1vw]">
          {otherData?.map((item, index) => {
            return (
              <Link
                href={item.link}
                key={index}
                className="flex items-center gap-[2vw]"
              >
                <img src={item.icon} alt="" className="w-[4vw] sm:w-[3vw]" />
                <p
                  // to={item?.link}
                  className="text-[3vw] text-[#334155] sm:text-[2.5vw]"
                >
                  {item.title}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col gap-[3vw] ml-[7vw] mt-[7vw]">
        <p className="font-medium text-[3.5vw] text-[#334155] sm:text-[3vw]">
          Other menue
        </p>
        <div className="flex flex-col gap-[4vw] ml-[1vw]">
          {headerData?.map((item, index) => {
            return (
              <Link
                href={item.link}
                key={index}
                className="flex items-center gap-[2vw]"
              >
                <p
                  // to={item?.link}
                  className="text-[3vw] text-[#334155] sm:text-[2.5vw]"
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
    </Box>
  );
  React.useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setImage(userData?.user?.img);
  }, []);

  console.log(image, "my");
  return (
    <div>
      <Drawer open={mobileSidebarOpen} onClose={toggleSidebar}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
