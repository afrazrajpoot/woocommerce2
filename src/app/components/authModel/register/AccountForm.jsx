"use client";

import { useGlobalContext } from "@/context/globalState";
import { accountForm2, accoutForm } from "@/data/data";
import { Avatar, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

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
  const navigate = useRouter();
  const {
    CreateWooCommerceData,
    updateWooCommerceData,
    loggedUser,
    customerDetails,
    setCustomerDetails,
    customerID,
    setCustomerID,
  } = useGlobalContext();

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    trigger,
  } = useForm({
    defaultValues: {
      username: customerDetails?.username || loggedUser?.fullName || "",
      email: customerDetails?.email || loggedUser?.email || "",
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
        username: customerDetails?.username || data?.username,
        first_name: customerDetails?.first_name || data?.first_name,
        last_name: customerDetails?.last_name || data?.last_name,
        email: customerDetails?.email || data?.email,
        billing: {
          phone: customerDetails?.phone || data?.phone,
          address_1: customerDetails?.address1 || data?.address1,
          postcode: customerDetails?.postcode || data?.postcode,
          city: customerDetails?.city || data?.city,
          country: customerDetails?.country || data?.country,
        },
      };

      if (customerID) {
        await updateWooCommerceData(`wc/v3/customers`, customerID, requestData);
        toast.success("updated successfully");
        navigate.push("/");
      } else {
        const user = await CreateWooCommerceData("wc/v3/customers", {
          ...requestData,
          password: "12345678", // Set a default password for new customers
        });
        localStorage.setItem("customerID", JSON.stringify(user?.id));
        setCustomerID(user?.id);
        toast.success("created successfully");
        navigate.push("/");
      }
      reset();
    } catch (error) {
      console.log(error.message, "error creating/updating account");
    }
  };

  return (
    <>
      <main className="mt-[3vw] lg:mt-[1vw]">
        <header className="flex items-start gap-[1vw] w-full">
          <figure className="">
            <Avatar className="w-[5vw] h-[5vw]">
              {loggedUser?.fullName[0]}
            </Avatar>
            {/* <img src="/img/accountAvatar.png" alt="avatar" className="" /> */}
          </figure>
          <div>
            <p className="lg:text-[1vw] text-[4vw] sm:text-[2.5vw] text-[#64748B]">
              We only support .JPG, .JPEG, or .PNG file.
            </p>
            <div className="mt-[1vw] flex gap-[1vw]">
              <Button className="bg-[#FF387A] text-white sm:text-[1.5vw] lg:text-[0.7vw] text-[2vw] font-bold hover:bg-[#FF387A] lg:py-[0.5vw] py-[1vw]   rounded-lg px-[2vw] ">
                upload photo
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
            {customerID ? "Update" : "Create"}
          </Button>
        </form>
      </main>
    </>
  );
};

export default AccountForm;
