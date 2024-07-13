import React, { useEffect, useState } from "react";
import {
  Button,
  FormControlLabel,
  Radio,
  IconButton,
  InputAdornment,
  Snackbar,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useForm, Controller } from "react-hook-form";
import { formData } from "@/data/data";
import { useSignupUserMutation } from "@/store/storeApi";
import { useGlobalContext } from "@/context/globalState";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";
import SignupModel from "../../authModel/register/SignupModel";

const Form = () => {
  const [register, { isLoading, isError, data, isSuccess }] =
    useSignupUserMutation();
  const navigate = useRouter();
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();
  const { setSignupModel, customerID, setLoginModel } = useGlobalContext();
  const [showPassword, setShowPassword] = useState(false);
  // const [successMessage, setSuccessMessage] = useState("");
  // const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const onSubmit = async (formData) => {
    try {
      const response = await register(formData);
      if (response.error) {
        toast.error(response.error.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return;
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success("Signup successful!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setSignupModel(false);
      setLoginModel(true);
    }
  }, [isSuccess]);
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="w-full">
        {formData.map((field, index) => (
          <div key={index} className="mb-4">
            <label
              htmlFor={field.name}
              className="block text-sm font-medium text-gray-700 text-[2vw] lg:text-[0.7vw] sm:text-[2vw]"
            >
              {field.label}
            </label>
            <Controller
              name={field.name}
              control={control}
              defaultValue=""
              rules={field.rules}
              render={({ field: controllerField }) => (
                <div className="relative">
                  <input
                    id={field.name}
                    type={
                      field.type === "password"
                        ? showPassword
                          ? "text"
                          : "password"
                        : field.type
                    }
                    required
                    {...controllerField}
                    className={`mt-1 block w-full lg:p-[0.5vw] sm:p-[2vw] rounded-md outline-none shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm lg:placeholder:text-[0.8vw] placeholder:text-[2vw] placeholder:text-[#A3A3A3] bg-[#FAFAFA] p-[0.5vw] ${
                      errors[controllerField.name]
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder={
                      (index === 0 && "e.g San Address") ||
                      (index === 1 && "e.g sanandreas@gmail.com") ||
                      (index === 2 && "Must be at least 8 character")
                    }
                  />
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
              )}
            />
          </div>
        ))}
        <div className="mb-4">
          <FormControlLabel
            value="female"
            control={<Radio size="small" />}
            label="Opt out of emails about latest product updates"
            className="lg:text-[0.9vw] text-[2.5vw] ml-[-4vw] lg:ml-[-1vw] sm:ml-[0.2vw] sm:text-[2vw]"
          />
        </div>

        <Button
          type="submit"
          size="large"
          className="w-full mt-4 text-[2vw] lg:text-[0.8vw] bg-[#FF387A] hover:bg-[#FF387A] text-white"
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </>
  );
};

export default Form;
