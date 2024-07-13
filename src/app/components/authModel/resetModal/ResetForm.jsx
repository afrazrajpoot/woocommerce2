"use client";
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { resetForm } from "@/data/data"; // Adjust import path as needed
import { useGlobalContext } from "@/context/globalState";
import { useResetPasswordMutation } from "@/store/storeApi"; // Adjust import path as needed

const ResetForm = () => {
  const { otpReset } = useGlobalContext();
  const [dataForResetPassword, setDataForResetPassword] = useState({
    id: "",
    otp: "",
    oldPassword: "",
    newPassword: "",
  });
  const [id, setId] = useState();
  const [resetPasswordApi, { isLoading, isError, isSuccess }] =
    useResetPasswordMutation();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setDataForResetPassword({
      id: id,
      otp: otpReset,
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    });
  };

  useEffect(() => {
    if (
      dataForResetPassword.id &&
      dataForResetPassword.otp &&
      dataForResetPassword.oldPassword &&
      dataForResetPassword.newPassword
    ) {
      resetPasswordApi(dataForResetPassword); // Ensure to await for the mutation
    }
  }, [dataForResetPassword]);

  useEffect(() => {
    if (isSuccess) {
      alert("Password reset successfully!"); // Alert or handle success as needed
    }
    if (isError) {
      alert("Password reset failed!");
    }
  }, [isSuccess, isError]);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData && userData.user && userData.user._id) {
      setId(userData.user._id);
    }
  }, []);

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
        {isLoading ? "Submitting..." : "Next"}
      </Button>
    </form>
  );
};

export default ResetForm;
