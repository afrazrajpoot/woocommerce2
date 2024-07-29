"use client";

import { useGlobalContext } from "@/context/globalState";
import { accountForm2, accoutForm } from "@/data/data";
import { Avatar, Button } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  useUpdateCustomerIDMutation,
  useUploadImageMutation,
} from "@/store/storeApi";
import Loading from "../../Common/Loading";

const FormInput = ({ label, type, name, value, onChange }) => {
  return (
    <div>
      <label
        htmlFor={label}
        className="lg:text-[0.9vw] sm:text-[2.5vw] text-[4vw] text-[#1B1B1B]"
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="bg-[#FAFAFA] p-[4vw] lg:p-[0.7vw] sm:text-[2vw] sm:p-[2vw] w-full focus:outline-none border-[1px] rounded-sm border-[#F5F5F5] lg:text-[0.9vw] text-[3.5vw] sm:w-[42vw] lg:w-[13vw]"
      />
    </div>
  );
};

const AccountForm = () => {
  const ref = useRef();
  const session = useSession();
  const [user, setUser] = useState({});
  const [file, setFile] = useState(null);
  const [url, imgUrl] = useState("");
  const [profileImage, setProfileImage] = useState(false);
  const navigate = useRouter();
  const {
    CreateWooCommerceData,
    updateWooCommerceData,
    loggedUser,
    customerDetails,
    customerID,
    setCustomerID,
    setSidebarImage,
    setCustomerDetails,
  } = useGlobalContext();
  const [loading, setLoading] = useState(false);
  const [uploadTheImage, { isLoading, isSuccess, data }] =
    useUploadImageMutation();
  const [updateCustomerId] = useUpdateCustomerIDMutation();
  const [googleImage, setGoogleImage] = useState("");
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      username:
        loggedUser?.fullName ||
        customerDetails?.username ||
        session?.data?.user?.name ||
        "",
      email:
        loggedUser?.email ||
        customerDetails?.email ||
        session.data?.user?.email ||
        "",
      phone: customerDetails?.phone || "",
      address1: customerDetails?.address1 || "",
      city: customerDetails?.city || "",
      postcode: customerDetails?.postcode || "",
      country: customerDetails?.country || "",
      first_name: customerDetails?.first_name || "",
      last_name: customerDetails?.last_name || "",
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails({ ...customerDetails, [name]: value });
  };

  const onSubmit = async (data) => {
    try {
      const requestData = {
        username: customerDetails?.username,
        first_name: customerDetails?.first_name || data?.first_name,
        last_name: customerDetails?.last_name || data?.last_name,
        email: customerDetails?.email,
        billing: {
          phone: customerDetails?.phone || data?.phone,
          address_1: customerDetails?.address1 || data?.address1,
          postcode: customerDetails?.postcode || data?.postcode,
          city: customerDetails?.city || data?.city,
          country: customerDetails?.country || data?.country,
        },
      };

      if (customerID) {
        const idToUpdate = customerID || userFromLocalStorage;
        setLoading(true);
        await updateWooCommerceData(`wc/v3/customers`, idToUpdate, requestData);
        setLoading(false);
        toast.success("Updated successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        navigate.push("/dashboard");
      } else {
        setLoading(true);
        const newUser = await CreateWooCommerceData("wc/v3/customers", {
          ...requestData,
          password: "12345678", // Set a default password for new customers
        });
        // update customerid
        if (newUser?.id) {
          await updateCustomerId({
            email: loggedUser?.email,
            customerId: newUser?.id,
          });
        }

        localStorage.setItem("customerID", JSON.stringify(newUser?.id));
        setCustomerID(newUser?.id);
        setLoading(false);
        toast.success("Created successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        navigate.push("/dashboard");
      }
      reset();
    } catch (error) {
      toast.error(error.message, {
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
  };
  function uploadImage() {
    ref.current.click();
  }

  async function uploadImageOnServer() {
    try {
      const userFromLocal = JSON.parse(localStorage.getItem("user"));
      if (!file) {
        toast.error("Please select the image to upload", {
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
      const formData = new FormData();
      formData.append("file", file);
      formData.append("id", userFromLocal.user._id);
      uploadTheImage(formData);
    } catch (error) {
      toast.error("Failed to upload image", {
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
  }
  useEffect(() => {
    const userFromLocal = JSON.parse(localStorage.getItem("user"));
    setUser(userFromLocal);
    setGoogleImage(session?.data?.user?.image);
  }, []);
  useEffect(() => {
    if (isSuccess) {
      localStorage.setItem("user", JSON.stringify(data));
      setSidebarImage(true);
      toast.success("Image upload successfully", {
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
  }, [isSuccess]);

  useEffect(() => {
    window.addEventListener("load", () => {
      setProfileImage(false);
    });

    return () => {
      window.removeEventListener("load", () => {
        setProfileImage(false);
      });
    };
  }, []);

  return (
    <>
      <main className="mt-[3vw] lg:mt-[1vw]">
        <header className="flex items-start gap-[1vw] w-full">
          <input
            type="file"
            className="hidden"
            name=""
            onChange={(e) => {
              setFile(e.target.files[0]);
              const url = URL.createObjectURL(e.target.files[0]);
              imgUrl(url);
              setProfileImage(true);
            }}
            id=""
            ref={ref}
          />
          <figure className="hover:cursor-pointer" onClick={uploadImage}>
            {user ? (
              <Avatar className="w-[5vw] h-[5vw]">
                {profileImage ? (
                  url ? (
                    <img
                      src={url || session?.data?.user?.image}
                      alt="avatar"
                      className="w-full h-full"
                    />
                  ) : (
                    <Avatar>{loggedUser?.fullName[0]}</Avatar>
                  )
                ) : (
                  <img
                    src={user?.user?.img || session?.data?.user?.image}
                    alt="avatar"
                    className="w-full h-full"
                  />
                )}
              </Avatar>
            ) : (
              <Avatar>
                <img src={`${session?.data?.user?.image}`} alt="google image" />
              </Avatar>
            )}
          </figure>
          <div>
            <p className="lg:text-[1vw] text-[4vw] sm:text-[2.5vw] text-[#64748B]">
              We only support .JPG, .JPEG, or .PNG file.
            </p>
            <div className="mt-[1vw] flex gap-[1vw]">
              <Button
                onClick={uploadImageOnServer}
                className="bg-[#FF387A] text-white sm:text-[1.5vw] lg:text-[0.7vw] text-[2vw] font-bold hover:bg-[#FF387A] lg:py-[0.5vw] py-[1vw]   rounded-lg px-[2vw] "
              >
                {isLoading ? <Loading /> : "upload photo"}
              </Button>
              <Button
                variant="outlined"
                className="border-[1px] border-[#FF387A] py-[1vw] sm:text-[1.5vw] lg:py-[0.5vw] px-[1.5vw] rounded-lg lg:text-[0.7vw] text-[2vw] text-[#FF387A]"
              >
                delete photo
              </Button>
            </div>
          </div>
        </header>
        <form onSubmit={handleSubmit(onSubmit)}>
          {accoutForm?.map((item, index) => (
            <div className="mt-[2vw]" key={index}>
              <div className="mb-4 sm:mb-6">
                <label
                  htmlFor={item.name}
                  className="lg:text-[0.9vw] sm:text-[2.5vw] text-[4vw] text-[#1B1B1B]"
                >
                  {item.label}
                </label>
                <div className="">
                  <Controller
                    name={item?.name}
                    control={control}
                    rules={item?.rules}
                    render={({ field }) => (
                      <input
                        {...field}
                        value={customerDetails?.[item?.name]}
                        onChange={(e) => {
                          handleInputChange(e);
                          field.onChange(e);
                        }}
                        // name={item.name}
                        type={item.type}
                        className="bg-[#FAFAFA] lg:p-[0.7vw] sm:text-[2vw] sm:p-[2vw] p-[4vw] w-full focus:outline-none border-[1px] rounded-sm border-[#F5F5F5] lg:text-[0.9vw] text-[3.5vw]"
                      />
                    )}
                  />
                  {errors[item?.name] && (
                    <p className="text-red-500">
                      {errors[item?.name]?.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div className="flex gap-[2vw] mb-4">
            <section>
              <Controller
                control={control}
                name="first_name"
                render={({ field }) => (
                  <FormInput
                    {...field}
                    value={customerDetails?.first_name}
                    // name="first_name"
                    onChange={(e) => {
                      handleInputChange(e);
                      field.onChange(e);
                    }}
                    label="First Name"
                    type="text"
                  />
                )}
              />
              {errors?.first_name && (
                <p className="text-red-500">{errors?.first_name?.message}</p>
              )}
            </section>
            <section>
              <Controller
                control={control}
                name="last_name"
                render={({ field }) => (
                  <FormInput
                    {...field}
                    value={customerDetails?.last_name}
                    name="last_name"
                    onChange={(e) => {
                      handleInputChange(e);
                      field.onChange(e);
                    }}
                    label="Last Name"
                    type="text"
                  />
                )}
              />
              {errors?.last_name && (
                <p className="text-red-500">{errors?.last_name?.message}</p>
              )}
            </section>
          </div>
          {accountForm2?.map((item, index) => (
            <div className="" key={index}>
              <div className="mb-4 flex flex-col">
                <label
                  htmlFor={item?.name}
                  className="lg:text-[0.9vw] sm:text-[2.5vw] text-[4vw] text-[#1B1B1B]"
                >
                  {item?.label}
                </label>
                <div className={""}>
                  <Controller
                    control={control}
                    rules={item?.rules}
                    name={item?.name}
                    render={({ field }) => (
                      <input
                        {...field}
                        value={customerDetails[item?.name]}
                        onChange={(e) => {
                          handleInputChange(e);
                          field.onChange(e);
                        }}
                        // name={item.name}
                        type={item.type}
                        className="bg-[#FAFAFA] lg:p-[0.7vw] sm:text-[2vw] sm:p-[2vw] p-[4vw] w-full focus:outline-none border-[1px] rounded-sm border-[#F5F5F5] lg:text-[0.9vw] text-[3.5vw]"
                      />
                    )}
                  />
                  {errors[item?.name] && (
                    <p className="text-red-500">
                      {errors[item?.name]?.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div className="flex gap-[2vw] mb-4">
            <section>
              <Controller
                control={control}
                name="postcode"
                render={({ field }) => (
                  <FormInput
                    {...field}
                    value={customerDetails?.postcode}
                    // name="postcode"
                    onChange={(e) => {
                      handleInputChange(e);
                      field.onChange(e);
                    }}
                    label="Postal code"
                    type="text"
                  />
                )}
              />
              {errors?.postcode && (
                <p className="text-red-500">{errors?.postcode?.message}</p>
              )}
            </section>
            <section>
              <Controller
                control={control}
                name="city"
                render={({ field }) => (
                  <FormInput
                    {...field}
                    value={customerDetails.city}
                    // name="city"
                    onChange={(e) => {
                      handleInputChange(e);
                      field.onChange(e);
                    }}
                    label="City"
                    type="text"
                  />
                )}
              />
              {errors?.city && (
                <p className="text-red-500">{errors?.city?.message}</p>
              )}
            </section>
          </div>
          <Button
            type="submit"
            size="small"
            variant="outlined"
            className="text-[2.5vw] lg:text-[0.7vw] sm:text-[1.5vw] text-[#FF387A] border-[1.5px] font-bold border-[#FF387A] hover:border-[#FF387A] lg:py-[0.6vw] py-[2vw] px-[3vw] lg:px-[1vw]"
          >
            {loading ? <Loading /> : customerID ? "Update" : "Create"}
          </Button>
        </form>
      </main>
    </>
  );
};

export default AccountForm;
