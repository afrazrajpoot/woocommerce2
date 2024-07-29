"use client";
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { resetForm } from "@/data/data"; // Adjust import path as needed
import { useGlobalContext } from "@/context/globalState";
import { useResetPasswordMutation } from "@/store/storeApi"; // Adjust import path as needed
import { toast } from "sonner";
import Loading from "../../Common/Loading";
// import Loading from "../../Common/Loading";

const ResetForm = () => {
  const { otpReset, setLoginModel, setResetModel } = useGlobalContext();

  const [id, setId] = useState("");
  const [resetPasswordApi, { isLoading, isError, isSuccess }] =
    useResetPasswordMutation();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    resetPasswordApi({
      id,
      otp: otpReset,
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    });
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userId"));
    if (userData) {
      setId(userData);
    }
  }, []);

  useEffect(() => {
    if (isSuccess) {
      setResetModel(false);
      setLoginModel(true);

      toast.success("Password reset successfully!", { position: "top-right" });
    }
    if (isError) {
      toast.error("Please enter correct OTP and password!", {
        position: "top-right",
      });
    }
  }, [isSuccess, isError]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="w-full">
      {resetForm.map((field, index) => (
        <div key={index} className="mb-4">
          <label
            htmlFor={field.name}
            className="block text-sm font-medium text-gray-700"
          >
            {field.label}
          </label>
          <Controller
            name={field.name}
            control={control}
            defaultValue=""
            rules={field.rules} // Adjust rules if needed
            render={({ field }) => (
              <input
                {...field}
                type={field.type}
                className={`mt-1 block w-full rounded-md outline-none shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm p-2 ${
                  errors[field.name] ? "border-red-500" : "border-gray-300"
                }`}
                placeholder={field.placeholder || ""}
                value={field.value}
                required
              />
            )}
          />
          {errors[field.name] && (
            <span className="text-red-500">{errors[field.name].message}</span>
          )}
        </div>
      ))}

      <Button
        type="submit"
        size="large"
        className="w-full mt-4 text-sm bg-[#FF387A] hover:bg-[#FF387A] text-white"
        disabled={isLoading} // Disable button while loading
      >
        {isLoading ? <Loading /> : "Next"}
      </Button>
    </form>
  );
};

export default ResetForm;
