"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "@mui/material/Modal";
import Form from "./RegisterForm";
import Image from "next/image";
import { useGlobalContext } from "@/context/globalState";
import { signIn, signOut, useSession } from "next-auth/react";

export default function SignupModel() {
  const [open, setOpen] = React.useState(false);
  const { openSignupModel, setSignupModel } = useGlobalContext();
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setSignupModel(false);
  };

  return (
    <div className="w-full relative">
      {/* <Button onClick={handleOpen}>Signup modal</Button> */}
      <Modal
        open={openSignupModel}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="flex flex-col justify-center items-center h-screen ">
          <div className="relative bg-white mt-[-20vw] px-[5vw] sm:pt-[15vw] pt-[25vw] lg:p-4 rounded-[0.5vw] shadow-lg w-full max-w-[100vw] h-[100vh] lg:h-[85vh]  lg:max-w-[28vw]  lg:mt-[3vw] flex sm:h-[100vh] flex-col gap-[1vw]">
            <div className="flex w-full justify-center">
              <Image src="/img/Logo.png" alt="logo" width={150} height={150} />
            </div>
            <h1 className="font-bold text-[3vw] lg:text-[1.2vw] sm:text-[2.5vw] text-center">
              Great to see you here!
            </h1>
            <p className="text-center text-[2.5vw] lg:text-[1vw] sm:text-[2vw] w-full max-w-[40vw] lg:max-w-[17vw] mx-auto">
              It’s free to create an account. Already have an account?{" "}
              <span className="text-[#FF387A]">Log in</span>
            </p>
            <Form />
            <div className="flex items-center w-full gap-[0.3vw]">
              <div className="border flex-grow mt-[3vw] lg:mt-[0vw]"></div>
              <div className="px-[0.5vw] py-[0.3vw] text-[3vw] lg:text-[0.8vw] mt-[3vw] lg:mt-[0vw] text-[#737373]">
                Or Sign Up with
              </div>
              <div className="border flex-grow mt-[3vw] lg:mt-[0vw]"></div>
            </div>
            <div className="flex w-full gap-[10vw] lg:gap-[2vw] lg:mt-[0vw] mt-[5vw] justify-center items-center">
              <Button
                onClick={() => signIn("google")}
                variant="outlined"
                className="w-full lg:max-w-[12vw] max-w-[35vw] flex items-center gap-[4vw] lg:gap-[2vw] border-[1px] border-[#E5E5E5]"
                style={{
                  backgroundColor: "#FAFAFA",
                  color: "#171717",
                  fontSize: "0.8vw",
                  fontWeight: "bold",
                }}
              >
                <div className="lg:ml-[-2vw] ml-[-5vw] wfull max-w-[8vw]">
                  <img src={"/img/google.png"} alt="img" classsName="w-full" />
                </div>
                <div className="pl-[0.5vw]">
                  <p className="lg:text-[0.8vw] text-[2vw]">Google</p>
                </div>
              </Button>

              <Button
                variant="outlined"
                onClick={() => signIn("facebook")}
                className="w-full lg:max-w-[12vw] max-w-[35vw] flex items-center gap-[4vw] lg:gap-[2vw] border-[1px] border-[#E5E5E5]"
                style={{
                  backgroundColor: "#FAFAFA",
                  color: "#171717",
                  fontSize: "0.8vw",
                  fontWeight: "bold",
                }}
              >
                <div className="lg:ml-[-2vw] ml-[-5vw] wfull max-w-[8vw]">
                  <img
                    src={"/img/facebook.png"}
                    alt="img"
                    classsName="w-full"
                  />
                </div>
                <div className="pl-[0.5vw]">
                  <p className="lg:text-[0.8vw] text-[2vw]">Facebook</p>
                </div>
              </Button>
            </div>
          </div>
          <Button className="flex justify-center items-center mt-[1vw]">
            <IconButton
              onClick={handleClose}
              style={{
                backgroundColor: "white",
                border: "1px solid #ccc",
                borderRadius: "50%",
                width: "2vw",
                height: "2vw",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CloseIcon />
            </IconButton>
          </Button>
        </div>
      </Modal>
    </div>
  );
}
