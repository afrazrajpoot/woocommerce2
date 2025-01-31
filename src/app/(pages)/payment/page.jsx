"use client";
import { checkoutFormData, summaryDetails, summaryOptions } from "@/data/data";
import {
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Steper from "../../components/authModel/register/Steper";
import { useGlobalContext } from "@/context/globalState";
// import CheckoutButton from "../components/CheckoutButton";
import { loadScript } from "@paypal/paypal-js";
import { toast } from "sonner";
// import SuccessPaymentModel from "../components/authModel/resetModal/SuccessPaymentModel";
import SuccessPaymentModel from "@/app/components/authModel/resetModal/SuccessPaymentModel";
import axios from "axios";
import {
  useSubmitSubscriptionMutation,
  useUpdateCustomerIDMutation,
} from "@/store/storeApi";
import { useRouter } from "next/navigation";
import Loading from "@/app/components/Common/Loading";

const Page = () => {
  const [paypalButtonRendered, setPaypalButtonRendered] = useState(false);
  const [successPayment, setSuccessPayment] = useState(false);
  const navigate = useRouter();
  const [loading, setLoading] = useState(false);
  const paymentData = [
    { img: "/img/visaCard.png", value: "visa" },
    { img: "/img/masterCard.png", value: "mastercard" },
    { img: "/img/citiCard.png", value: "citi" },
    { img: "/img/capitalOne.png", value: "capitalone" },
  ];
  const paymentData2 = [
    { img: "/img/appleCard.png", value: "appleCard" },
    { img: "/img/paypalCard.png", value: "paypalCard" },
  ];

  const [selectedPayment, setSelectedPayment] = useState(null);
  const [id, setId] = useState(null);
  const [setSubscription, { isError, isLoading, data, isSuccess }] =
    useSubmitSubscriptionMutation();
  const { selectedPlan, customerID, customerDetails, loggedUser } =
    useGlobalContext();
  // const [successPayment, setSuccessPayment] = useState(false);
  const [updateCustomerId] = useUpdateCustomerIDMutation();

  const handleRadioChange = (event) => {
    setSelectedPayment(event.target.value);
  };
  const submitSubscription = async () => {
    try {
      const res = await setSubscription({
        userId: id,
        username: customerDetails?.username,
        email: customerDetails?.email,
        downloadLimit: 0,
        price: selectedPlan.price,
        available: selectedPlan.available,
      });
    } catch (err) {
      toast.error("Network failed please try again", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const paymentMethod = async () => {
    if (paypalButtonRendered) {
      return;
    }

    loadScript({ "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID }).then(
      (paypal) => {
        paypal
          .Buttons({
            createOrder: (data, actions) => {
              const items = [
                {
                  name: "Monthly Subscription",
                  unit_amount: {
                    currency_code: "USD",
                    value: parseFloat(selectedPlan.price).toFixed(2),
                  },
                  quantity: "1",
                },
              ];

              const itemTotal = items
                .reduce(
                  (total, item) =>
                    total +
                    parseFloat(item.unit_amount.value) *
                      parseInt(item.quantity),
                  0
                )
                .toFixed(2);

              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: itemTotal,
                      breakdown: {
                        item_total: {
                          currency_code: "USD",
                          value: itemTotal,
                        },
                      },
                    },
                    items: items,
                  },
                ],
              });
            },
            onApprove: (data, actions) => {
              return actions.order.capture().then((detail) => {
                const lineItems = detail.purchase_units[0].items.map(
                  (item) => ({
                    name: item.name,
                    quantity: item.quantity,
                    price: item.unit_amount.value,
                    subtotal: item.unit_amount.value,
                    total: item.unit_amount.value,
                    taxes: [],
                    meta_data: [],
                  })
                );

                submitSubscription();

                setSuccessPayment(true);
              });
            },
            onCancel: (data) => {
              toast.error("Payment cancelled", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
            },
            onError: (err) => {
              toast.error("Payment insufficient amount 0", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
            },
          })
          .render("#paypal-button-container");

        setPaypalButtonRendered(true);
      }
    );
  };

  const handlePayment = () => {
    setLoading(true);
    if (!id) {
      toast.error("Please login your account", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setLoading(false);
      return;
    }
    if (customerID) {
      paymentMethod();
      setLoading(false);
      return;
    }
    toast.error("Please register your account as a customer", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    setLoading(false);
    navigate.push("/accountdetails");
  };

  useEffect(() => {
    if (isSuccess) {
      localStorage.setItem("subscriptionId", data?.subscription?._id);
      updateCustomerId({
        email: loggedUser?.email,
        customerId: loggedUser?.customerId,
        subscriptionId: data?.subscription?._id,
      });
    }
    const id = JSON.parse(localStorage.getItem("user"));
    setId(id?.user?.email);
  }, [isSuccess]);
  return (
    <main className="bg-[#FAFAFA] lg:h-[200vh] h-[260vh] overflow-x-hidden overflow-y-hidden">
      <section className="lg:translate-y-[5vw] sm:translate-y-[10vw] translate-y-[20vw] p-[2vw] w-full max-w-[90vw] m-auto">
        <Button
          variant="outlined"
          className="border-[1px] border-[#E5E5E5] sm:text-[1.5vw] rounded-lg p-[0.5vw] text-[#525252] flex items-center lg:gap-[0.1vw] lg:w-[6vw] w-[20vw] sm:w-[10vw] sm:ml-[-2vw] sm:translate-y-[3vw] lg:translate-y-[0vw] sm:pr-[2vw] ml-[1vw] lg:ml-[0vw] lg:text-[1vw] text-[3vw] lg:py-[0.3vw] sm:py-[1vw] py-[1.55vw]"
          startIcon={
            <img
              src="/img/backIcon.png"
              alt="back icon"
              className="w-[5vw] sm:w-[10vw] lg:w-[2vw]"
            />
          }
        >
          Back
        </Button>
        <section className="flex lg:flex-row flex-col mt-[3vw] ml-[-9.5vw]">
          <article className="w-full max-w-[70vw] flex flex-col gap-[2vw] mt-[5vw] sm:mt-[7vw] lg:mt-[0vw]">
            <Steper />
            <div className="bg-white border-[1px] border-[#F5F5F5] mt-[8vw] lg:rounded-lg sm:mt-[5vw] lg:w-[50vw] lg:p-[1vw] lg:ml-[10vw] ml-[7vw] p-[4vw] w-[90vw] rounded-xl lg:mt-[1vw]">
              <p className="font-bold lg:text-[1.5vw] text-[5vw] sm:text-[3vw]">
                Payment Method
              </p>
              <FormControl component="fieldset">
                <RadioGroup
                  value={selectedPayment}
                  // onChange={handleRadioChange}
                >
                  <article className="flex gap-[1vw]">
                    {paymentData.map((elem, ind) => (
                      <section
                        key={ind}
                        className={`border-[1px] border-[#F5F5F5] mt-[2vw] p-[2vw] rounded-lg ${
                          selectedPayment === elem.value ? "bg-gray-100" : ""
                        }`}
                      >
                        <FormControlLabel
                          value={elem.value}
                          control={<Radio />}
                          label={
                            <figure>
                              <img
                                src={elem.img}
                                alt="payment method"
                                className="w-[10vw] sm:w-[15vw] lg:w-[10vw]"
                              />
                            </figure>
                          }
                        />
                      </section>
                    ))}
                  </article>
                  <article className=" mt-[2vw]">
                    {paymentData2.map((elem, ind) => (
                      <section
                        key={ind}
                        className={`border-[1px] border-[#F5F5F5] p-[0.7vw] rounded-lg ${
                          selectedPayment === elem.value ? "bg-gray-100" : ""
                        }`}
                      >
                        <FormControlLabel
                          value={elem.value}
                          control={<Radio />}
                          label={
                            <div className="flex gap-[1vw]">
                              <figure>
                                <img
                                  src={elem.img}
                                  alt="payment method"
                                  className=""
                                />
                              </figure>
                              {ind === 0 && (
                                <p className="font-bold lg:text-[0.9vw] sm:text-[2vw] text-[3.5vw]">
                                  {elem.value}
                                </p>
                              )}
                            </div>
                          }
                        />
                      </section>
                    ))}
                  </article>
                </RadioGroup>
              </FormControl>
            </div>
          </article>
          <section>
            <article className="bg-white border-[1px] mt-[8vw] sm:ml-[7vw] lg:ml-[0vw] sm:mt-[5vw] ml-[8vw] rounded-xl w-[90vw] border-[#F5F5F5] lg:w-[25vw] p-[2vw] lg:mt-[0vw]">
              <p className="font-bold lg:text-[1.5vw] text-[5vw] sm:text-[3vw]">
                Summary
              </p>
              <div className="mt-[1vw] flex flex-col lg:gap-[0.8vw] gap-[4vw]">
                {selectedPlan.features?.map((elem, ind) => (
                  <div
                    className="flex gap-[1vw] justify-between items-center"
                    key={ind}
                  >
                    <p className="font-medium lg:text-[0.9vw] sm:text-[2vw] text-[3.5vw]">
                      {elem}
                    </p>
                  </div>
                ))}
              </div>
              <div className="border-[0.2px] border-b-[#EEEEEE] lg:mt-[1.5vw] mt-[3vw]"></div>
              <div className="flex justify-between mt-[1vw]">
                <p className="font-medium lg:text-[0.9vw] text-[3.5vw] lg:mt-[0vw] sm:text-[2vw] mt-[3vw]">
                  Subtotal
                </p>
                <p className="text-[#FF689A] font-bold lg:font-medium lg:text-[0.8vw] text-[2.5vw] sm:text-[1.5vw] lg:mt-[0vw] mt-[3vw]">
                  ${selectedPlan?.price}
                </p>
              </div>
              <Button
                type="submit"
                size="large"
                className="w-full lg:mt-[1.5vw] mt-[3vw] sm:text-[1.5vw] text-[2.5vw] lg:text-[0.8vw] bg-[#FF387A] hover:bg-[#FF387A] text-white"
                onClick={handlePayment}
              >
                {loading ? <Loading /> : "Continue to Payment"}
              </Button>
              <div
                id="paypal-button-container"
                className="lg:mt-[1vw] mt-[3vw]"
              ></div>
              <div className="border-[0.2px] border-b-[#EEEEEE] lg:mt-[1vw] mt-[3vw] "></div>
              <div className="flex lg:translate-x-[-4.2vw] w-full lg:mt-[1vw] mt-[3vw] lg:ml-[5vw] sm:ml-[4vw] ml-[-1vw] lg:gap-[2vw] gap-[7.5vw]">
                {summaryOptions?.map((elem, ind) => (
                  <div
                    key={ind}
                    className="flex flex-col items-center sm:justify-center"
                  >
                    <img
                      src={elem.icon}
                      alt="icon"
                      className={`ml-[1vw] lg:w-[3vw] w-[10vw] sm:w-[6vw] ${
                        ind === 1 && "translate-x-[-0.5vw]"
                      } ${ind === 0 && "translate-x-[-0.5vw]"} ${
                        ind === 2 && "translate-x-[-0.3vw]"
                      }`}
                    />
                    <p
                      className={`lg:text-[0.7vw] w-full sm:text-[2vw] flex justify-center text-[3vw] font-medium text-center mt-[0.5vw] ${
                        ind === 0 && "lg:w-[5vw] w-[12vw]"
                      }`}
                    >
                      {elem.desc}
                    </p>
                  </div>
                ))}
              </div>
            </article>
          </section>
        </section>
      </section>
      {successPayment && <SuccessPaymentModel success={true} />}
    </main>
  );
};

export default Page;
// fVav oQs7 7NOv NZs9 LFhY tA8R   enable api pass
