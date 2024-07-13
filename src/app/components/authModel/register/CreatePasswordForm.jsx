"use client";
import { createPasswordForm } from "@/data/data";
import { useUpdatePasswordMutation } from "@/store/storeApi";
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";

const CreatePasswordForm = () => {
  const [id, setId] = useState("");
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const newPassword = watch("newPassword");
  const [updatePassword, { isLoading, isError, isSuccess }] =
    useUpdatePasswordMutation();

  const onSubmit = async (data) => {
    const formData = {
      oldPassword: data?.oldPassword,
      id: id,
      newPassword: data?.newPassword,
    };
    await updatePassword(formData);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Password updated successfully", {
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
    if (isError) {
      toast.error("Something went wrong", {
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
  }, [isSuccess, isError]);

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("user"));
    setId(userId?.user?._id);
  }, []);
  // console.log(id, "id");
  return (
    <main className="p-[1vw] mt-[1vw]">
      <h1 className="font-bold sm:text-[3vw] lg:text-[1.5vw]">
        Create new Password
      </h1>
      <div className="mt-[1vw]">
        <form onSubmit={handleSubmit(onSubmit)} className="mt-[1.5vw]">
          {createPasswordForm?.map((field, index) => (
            <div key={index} className="mb-4">
              <label
                htmlFor={field.name}
                className="block font-medium text-[#1B1B1B] sm:text-[2.5vw] text-[4vw] lg:text-[0.8vw]"
              >
                {field.label}
              </label>
              <Controller
                name={field.name}
                control={control}
                defaultValue=""
                rules={{
                  ...field.rules,
                  validate: (value) =>
                    field.name === "confirmPassword"
                      ? value === newPassword || "Passwords do not match"
                      : true,
                }}
                render={({ field: controllerField }) => (
                  <input
                    id={controllerField.name}
                    type={field.type}
                    required
                    {...controllerField}
                    className={`mt-1 block w-full rounded-lg sm:text-[2.5vw] sm:p-[2vw] outline-none shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm placeholder:text-[0.8vw] placeholder:text-[#A3A3A3] bg-[#FAFAFA] p-[4vw] lg:p-[0.5vw] ${
                      errors[controllerField.name]
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                )}
              />
              {errors[field.name] && (
                <p className="text-red-500 sm:text-[2vw] lg:text-[0.8vw]">
                  {errors[field.name].message}
                </p>
              )}
            </div>
          ))}
          <Button
            type="submit"
            size="large"
            className="w-full mt-4 text-[3vw] lg:text-[0.8vw] sm:text-[1.5vw] bg-[#FF387A] hover:bg-[#FF387A] text-white"
          >
            {isLoading ? "Loading..." : "Save changes"}
          </Button>
        </form>
      </div>
    </main>
  );
};

export default CreatePasswordForm;
