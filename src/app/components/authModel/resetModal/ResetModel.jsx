"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "@mui/material/Modal";
import Form from "../../Common/Footer/Form";
import Image from "next/image";
import SigninForm from "../register/SigninForm";
import ForgetForm from "../forgotPassword/ForgetForm";
import ResetForm from "./ResetForm";
import { useGlobalContext } from "@/context/globalState";

export default function ResetModel() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setResetModel(false);
const {openResetModel, setResetModel} = useGlobalContext()
  return (
    <div className="w-full relative">
      {/* <Button onClick={handleOpen}>Reset Password modal</Button> */}
      <Modal
        open={openResetModel}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="flex flex-col justify-center items-center h-screen">
          <div className="relative bg-white p-4 pt-[15vw] lg:pt-[1vw] rounded-[0.5vw] shadow-lg w-full max-w-[100vw] lg:h-[50vh] h-[100vh] lg:max-w-[28vw] mt-[-3vw] flex flex-col gap-[1vw]">
            <div className="flex w-full justify-center">
              <Image src="/img/Logo.png" alt="logo" width={150} height={150} />
            </div>
            <h1 className="font-bold text-[3vw] lg:text-[1.2vw] text-center">
              Reset Password
            </h1>
            <p className="text-center text-[2vw] lg:text-[0.8vw]">
              Recover your account password
            </p>
            <ResetForm />
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
