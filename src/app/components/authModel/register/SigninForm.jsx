"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  FormControlLabel,
  Radio,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useForm, Controller } from "react-hook-form";
import { loginFormData } from "@/data/data";
import { useGlobalContext } from "@/context/globalState";
import { useLoginUserMutation } from "@/store/storeApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const SigninForm = () => {
  const navigate = useRouter();
  const { tokenInLocal, setLoginModel, setForgetModel, customerID } =
    useGlobalContext();
  const [showPassword, setShowPassword] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const [login, { isLoading, isError, isSuccess, data }] =
    useLoginUserMutation();

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  // const onSubmit = async (formData) => {
  //   const res = await login(formData);
  //   // console.log(res, "ress");
  //   tokenInLocal(res);
  // };
  const onSubmit = async (formData) => {
    try {
      const res = await login(formData);
      tokenInLocal(res);
    } catch (error) {
      console.log(error);
    }
    // console.log(res, "ress");
  };
  useEffect(() => {
    if (isError) {
      setLoginModel(true);
      // alert("Please enter correct details");
      toast.error("Please enter correct details", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    if (isSuccess) {
      setLoginModel(false);

      toast.success("Login Successful", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      if (customerID) {
        navigate.push("/");
      } else {
        navigate.push("/accountdetails");
      }
    }
  }, [isError, isSuccess]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="w-full">
      {loginFormData.map((field, index) => (
        <div key={index} className="mb-4">
          <label
            htmlFor={field.name}
            className="block text-sm font-medium text-gray-700 text-[0.8vw]"
          >
            {field.label}
          </label>
          <div className="relative">
            <Controller
              name={field.name}
              control={control}
              defaultValue=""
              rules={{
                required: `${field.label} is required`,
                pattern:
                  field.type === "email"
                    ? { value: /\S+@\S+\.\S+/, message: "Email is not valid" }
                    : {},
                minLength:
                  field.type === "password"
                    ? {
                        value: 8,
                        message: "Password must be at least 8 characters",
                      }
                    : {},
              }}
              render={({ field: controllerField }) => (
                <input
                  {...controllerField}
                  id={field.name}
                  type={
                    field.type === "password"
                      ? showPassword
                        ? "text"
                        : "password"
                      : field.type
                  }
                  className={`mt-1 block w-full rounded-md text-[3vw] lg:text-[0.8vw] p-[3vw]   outline-none shadow-sm focus:border-indigo-500 focus:ring-indigo-500  lg:placeholder:text-[0.8vw] placeholder:text-[#A3A3A3] bg-[#FAFAFA] lg:p-[0.5vw] border-gray-300 ${
                    errors[field.name] ? "border-red-500" : ""
                  }`}
                  placeholder={
                    (index === 0 && "e.g sanandreas@gmail.com") ||
                    (index === 1 && "Must be at least 8 characters")
                  }
                />
              )}
            />
            {errors[field.name] && (
              <p className="text-red-500 text-[0.7vw]">
                {errors[field.name].message}
              </p>
            )}
            {field.type === "password" && (
              <InputAdornment
                position="end"
                className="absolute inset-y-0 right-0 flex items-center  pr-3 top-[5vw] lg:top-[1.2vw]"
              >
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                  size="small"
                  style={{ padding: "0.3vw" }}
                >
                  {showPassword ? (
                    <Visibility className="text-[5vw] lg:text-[1vw]" />
                  ) : (
                    <VisibilityOff className="text-[5vw] lg:text-[1vw]" />
                  )}
                </IconButton>
              </InputAdornment>
            )}
          </div>
        </div>
      ))}
      <p
        onClick={() => {
          setForgetModel(true);
          setLoginModel(false);
        }}
        className="hover:cursor-pointer lg:text-[0.7vw] text-[2vw] text-[#FF387A] ml-[75vw] lg:ml-[19.6vw] font-bold w-full  max-w-[30vw]"
      >
        Forgot password?
      </p>
      <div className="mb-4">
        <FormControlLabel value="female" control={<Radio size="small" />} />
        <label htmlFor="" className="lg:text-[0.9vw] text-[2vw] ml-[-1vw]">
          Opt out of emails about latest product updates
        </label>
      </div>

      <Button
        type="submit"
        size="large"
        className="w-full mt-4 text-[2vw] lg:text-[0.8vw] bg-[#FF387A] hover:bg-[#FF387A] text-white"
      >
        Submit
      </Button>
    </form>
  );
};

export default SigninForm;
