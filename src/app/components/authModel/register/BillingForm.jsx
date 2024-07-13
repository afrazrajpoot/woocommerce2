"use client";

import { useGlobalContext } from "@/context/globalState";
import { billingAddressFrom } from "@/data/data";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

const BillingForm = () => {
  const { CreateWooCommerceData, fetchWooCommerceData, updateWooCommerceData,
  customerDetails, setCustomerDetails } = useGlobalContext();
const [loggedUser, setLoggedUser] = useState(null);
const [customerID, setCustomerID] = useState(null);


const { handleSubmit, control, formState: { errors }, reset, trigger } = useForm({
  defaultValues: {
    username: customerDetails?.username || (loggedUser?.fullName || ''),
    email: customerDetails?.email || (loggedUser?.email || ''),
    phone: customerDetails?.phone || '',
    address1: customerDetails?.address1 || '',
    city: customerDetails?.city || '',
    postcode: customerDetails?.postcode || '',
    country: customerDetails?.country || '',
    first_name: customerDetails?.first_name || '',
    last_name: customerDetails?.last_name || '',
  },
});

// console.log(customerDetails, "customerDetails");

const handleInputChange = (e) => {
  const { name, value } = e.target;
  setCustomerDetails({ ...customerDetails, [name]: value });
  trigger(name);
};

const onSubmit = async (data) => {

      // if data is empty then use a for loop and set the customer details to the values of the input fields
      for (const details of customerDetails){
        console.log(details, "details");
          setCustomerDetails({...customerDetails, [details]: loggedUser?.[details] || '' });
      }

  
  // console.log(data, "data");
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
    } else {
      const user = await CreateWooCommerceData("wc/v3/customers", {
        ...requestData,
        password: "12345678", // Set a default password for new customers
      });
      localStorage.setItem("customerID", JSON.stringify(user?.id));
      setCustomerID(user?.id);
    }
    reset();
  } catch (error) {
    console.log(error.message, "error creating/updating account");
  }
};

useEffect(() => {
  const customerID = localStorage.getItem("customerID");
  if (customerID) {
    setCustomerID(customerID);
    fetchWooCommerceData(`wc/v3/customers/${customerID}`).then((data) => {
      setCustomerDetails({
        username: data?.username || '',
        first_name: data?.first_name || '',
        last_name: data?.last_name || '',
        email: data?.email || '',
        postcode: data?.billing?.postcode || '',
        phone: data?.billing?.phone || '',
        address1: data?.billing?.address_1 || '',
        city: data?.billing?.city || '',
        country: data?.billing?.country || '',
      });
    });
  }
}, []);

useEffect(() => {
  const user = localStorage.getItem("user");
  if (user) {
    try {
      const parsedUser = JSON.parse(user);
      setLoggedUser(parsedUser?.user);
      setCustomerDetails({...customerDetails, username: parsedUser?.user?.fullName, email: parsedUser?.user?.email});
    } catch (error) {
      console.error(error);
    }
  }
}, []);
  return (
    <main className="">
      <form action="">
        {billingAddressFrom?.map((item, index) => (
          <div className={""}>
            <div key={index} className="lg:mb-6 mb-[3vw]">
              <label htmlFor={item.name} className="lg:text-[0.9vw] sm:text-[2.5vw]  text-[4vw] font-medium  text-[#1B1B1B]">
                {item.label}
              </label>
              <div className={''}>
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
                    type={item.type}
                    className="bg-[#FAFAFA] p-[3vw] lg:p-[0.7vw] sm:text-[2vw] sm:p-[2vw] w-full focus:outline-none border-[1px] rounded-sm border-[#F5F5F5] lg:text-[0.9vw] text-[3.5vw]"
                    />
                )}
              />
              {errors[item?.name] && <p className="text-red-500">{errors[item?.name]?.message}</p>}
              </div>
            </div>
          </div>
        ))}
        <div className="flex gap-[4vw] lg:gap-[2vw] ">
          <div className="flex flex-col">
            <label htmlFor="" className="font-bold text-[4vw] sm:text-[2.5vw] lg:text-[0.9vw]" >
              City
            </label>
            <Controller
                name={'city'}
                control={control}
                // rules={item?.rules}
                render={({ field }) => (
                  <input
                  {...field}
                 type="text" value={customerDetails?.city}
              className="bg-[#FAFAFA] p-[3vw] lg:p-[0.7vw] sm:text-[2vw] sm:p-[2vw] w-full focus:outline-none border-[1px] rounded-sm border-[#F5F5F5] lg:text-[0.9vw] text-[3.5vw] lg:w-[22vw] sm:w-[41vw]"
            />
            )}
            />
          </div>
          <div className="flex flex-col mb-6">
            <label htmlFor="" className="font-bold text-[4vw] sm:text-[2.5vw] lg:text-[0.9vw]">
              Postal code
            </label>
            <Controller
                name={'postcode'}
                control={control}
                // rules={item?.rules}
                render={({ field }) => (
                  <input
                  {...field} type="text" value={customerDetails?.postcode}
              className="bg-[#FAFAFA] p-[3vw] lg:p-[0.7vw] sm:text-[2vw] sm:p-[2vw] w-full focus:outline-none border-[1px] rounded-sm border-[#F5F5F5] lg:text-[0.9vw] text-[3.5vw] lg:w-[22vw] sm:w-[41vw]"
            />
                )}
              />
          </div>
        </div>
      </form>
      <Button
        size="small"
        variant="outlined"
        className=" lg:text-[0.7vw] text-[4vw] sm:text-[1.5vw] text-[#FF387A] border-[1.5px] font-bold border-[#FF387A] hover:border-[#FF387A] py-[0.6vw] px-[1vw] "
        style={{ textTransform: "capitalize" }}
      >
        Edit
      </Button>
    </main>
  );
};

export default BillingForm;
