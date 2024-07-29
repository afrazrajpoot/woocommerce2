"use client";
import { checkoutFormData, summaryOptions } from "@/data/data";
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import Steper from "../../components/authModel/register/Steper";
import { useGlobalContext } from "@/context/globalState";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Link from "next/link";
import { loadScript } from "@paypal/paypal-js";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const page = () => {
  const [checkoutDetail, setCheckoutDetail] = useState();

  const [navigation, setNavigation] = useState(false);
  const navigate = useRouter();
  const {
    productsAddedToCart,
    customerDetails,
    CreateWooCommerceData,
    customerID,
    setState,
    cartDetail,
    setCartDetail,
    active,
    setActive,
  } = useGlobalContext();
  const [paypalButtonRendered, setPaypalButtonRendered] = useState(false);

  const fetchOrder = async (data) => {
    try {
      const response = await CreateWooCommerceData(`wc/v3/orders`, data);
    } catch (err) {
      toast.error("Network fail please try again later", {
        position: "top-right",
      });
    }
  };
  useEffect(() => {
    const storedProducts =
      JSON.parse(localStorage.getItem("productsAddedToCart")) || [];
    if (productsAddedToCart?.length > 0) {
      setCheckoutDetail(productsAddedToCart);
    } else {
      setCheckoutDetail(storedProducts);
    }
  }, [productsAddedToCart]);

  let totalPrice = 0;
  for (let i = 0; i < checkoutDetail?.length; i++) {
    if (checkoutDetail[i]?.sale_price) {
      totalPrice += parseFloat(checkoutDetail[i]?.sale_price);
    } else {
      totalPrice += parseFloat(checkoutDetail[i]?.regular_price);
    }
  }

  async function paymentMethod() {
    if (paypalButtonRendered) {
      return;
    }
    loadScript({ "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID }).then(
      (paypal) => {
        paypal
          .Buttons({
            createOrder: (data, actions) => {
              const items = checkoutDetail.map((product) => ({
                name: product.name,
                unit_amount: {
                  currency_code: "USD",
                  value: parseFloat(
                    product.sale_price || product.regular_price
                  ).toFixed(2),
                },
                quantity: "1",
              }));

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
                // console.log(detail, "Payment successful:");

                const lineItems = detail?.purchase_units?.[0]?.items?.map(
                  (item) => ({
                    product_id: item.id,
                    name: item.name,
                    quantity: item.quantity,
                    price: item.unit_amount.value,
                    subtotal: item.unit_amount.value,
                    total: item.unit_amount.value,
                    taxes: [],
                    meta_data: [],
                    sku: checkoutDetail?.[0]?.sku || null,
                    image: checkoutDetail?.[0]?.images?.[0]?.src
                      ? {
                          id: 0,
                          src:
                            checkoutDetail?.[0]?.images?.[0]?.src +
                            " " +
                            checkoutDetail[0].downloads[0].id,
                        }
                      : null,
                  })
                );

                fetchOrder({
                  payment_method: "paypal",
                  payment_method_title: "PayPal",
                  set_paid: true,
                  customer_id: customerID,
                  billing: {
                    first_name: detail.payer.name.given_name,
                    last_name: detail.payer.name.surname,
                    address_1:
                      detail.purchase_units[0].shipping.address.address_line_1,
                    address_2: checkoutDetail[0].downloads[0].id,
                    city: detail.purchase_units[0].shipping.address
                      .admin_area_2,
                    state:
                      detail.purchase_units[0].shipping.address.country_code,
                    postcode:
                      detail.purchase_units[0].shipping.address.postal_code,
                    country:
                      detail.purchase_units[0].shipping.address.country_code,
                    email: customerDetails?.email,
                    phone: customerDetails?.phone,
                  },
                  shipping: {
                    first_name: detail.payer.name.given_name,
                    last_name: detail.payer.name.surname,
                    address_1:
                      detail.purchase_units[0].shipping.address.address_line_1,
                    address_2: checkoutDetail[0].downloads[0].id,
                    city: detail.purchase_units[0].shipping.address
                      .admin_area_2,
                    state:
                      detail.purchase_units[0].shipping.address.country_code,
                    postcode:
                      detail.purchase_units[0].shipping.address.postal_code,
                    country:
                      detail.purchase_units[0].shipping.address.country_code,
                  },
                  line_items: lineItems,
                  shipping_lines: [
                    {
                      method_id: "flat_rate",
                      method_title: "Flat Rate",
                      total: "10.00",
                    },
                  ],
                });
                localStorage.removeItem("productsAddedToCart");
                localStorage.removeItem("checkout");
                setNavigation(true);
                setCartDetail(true);

                setState(true);
                toast.success("Order created", {
                  position: "top-right",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });
                setTimeout(() => {
                  navigate.push("/downloads");
                }, 3000);
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
              // console.log(err, "error");
              toast.error("Payment error", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
              // console.log("Payment error:", err);
            },
          })
          .render("#paypal-button-container");
        setPaypalButtonRendered(true);
      }
    );
  }
  const handlePayment = () => {
    if (customerID) {
      paymentMethod();
      return;
    }
    toast.error("Please register your account", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    navigate.push("/accountdetails");
  };

  useEffect(() => {
    if (navigation) {
      navigate.push("/downloads");
    }
  }, [navigation]);
  return (
    <main className="bg-[#FAFAFA] lg:h-[200vh] h-[260vh] overflow-x-hidden overflow-y-hidden">
      <section className="lg:translate-y-[5vw] sm:translate-y-[10vw] translate-y-[20vw] p-[2vw] w-full max-w-[90vw] m-auto">
        <Link href={`/product/${checkoutDetail?.[0]?.slug}`}>
          <Button
            variant="outlined"
            className="border-[1px] border-[#E5E5E5] sm:text-[1.5vw] hover:bg-[#FF689A] hover:border-[#FF689A] hover:text-[#ffff] rounded-lg p-[0.5vw] text-[#525252] flex items-center lg:gap-[0.1vw] lg:w-[8vw] w-[20vw] sm:w-[10vw] sm:ml-[-2vw] sm:translate-y-[3vw] lg:translate-y-[0vw] sm:pr-[2vw] ml-[1vw] lg:ml-[0vw] lg:text-[1vw] text-[3vw] lg:py-[0.3vw] sm:py-[1vw] py-[1.55vw]"
            startIcon={<ArrowBackIosIcon />}
          >
            Back
          </Button>
        </Link>
        <section className="flex lg:flex-row flex-col mt-[3vw] ml-[-9.5vw]">
          <article className="w-full max-w-[70vw] flex flex-col gap-[2vw] mt-[5vw] sm:mt-[7vw] lg:mt-[0vw]">
            <Steper active={active} />
            <div className="bg-white border-[1px] border-[#F5F5F5] mt-[8vw] lg:rounded-lg  sm:mt-[5vw] lg:w-[50vw] lg:p-[1vw] lg:ml-[10vw] ml-[7vw] p-[4vw] w-[90vw] rounded-xl lg:mt-[1vw]">
              <p className="font-bold lg:text-[1.5vw] text-[5vw] sm:text-[3vw]">
                {" "}
                Contact Info
              </p>
              <form
                action=""
                className="flex flex-col mt-[1vw] lg:text-[1vw] text-[4vw]"
              >
                <label htmlFor="" className="sm:text-[2.5vw] lg:text-[1vw]">
                  Email
                </label>
                <input
                  type="text"
                  className="lg:p-[0.8vw] p-[2vw] bg-[#FAFAFA] lg:text-[1vw] text-[3.5vw] sm:text-[2vw] sm:p-[2vw]"
                  placeholder="magika@mail.com"
                  value={customerDetails?.email}
                  name="email"
                />
              </form>
            </div>
            <div className="bg-white border-[1px] ml-[7vw] p-[2vw] mt-[8vw] border-[#F5F5F5] lg:rounded-lg sm:mt-[5vw]  w-[90vw] lg:w-[50vw] lg:p-[1vw] lg:ml-[10vw] rounded-xl lg:mt-[1vw]">
              <p className="font-bold lg:text-[1.5vw] text-[5vw] sm:text-[3vw] ">
                Detail Address
              </p>
              <form action="" className="mt-[1vw] sm:mt-[3vw]">
                {checkoutFormData?.map((elem, ind) => (
                  <div key={ind} className="flex flex-col gap-[1vw] sm:mb-4">
                    <label
                      htmlFor=""
                      className="font-medium lg:text-[1vw] text-[4vw] sm:text-[2.5vw]"
                    >
                      {elem.label}
                    </label>
                    <input
                      type="text"
                      className="lg:p-[0.8vw] p-[2vw] lg:text-[1vw] text-[3.5vw] bg-[#FAFAFA] mb-4 sm:text-[2vw] sm:p-[2vw]"
                      value={customerDetails?.[elem?.name]}
                      name={customerDetails?.[elem?.name]}
                    />
                  </div>
                ))}
                <div className="flex lg:gap-[1vw] gap-[2vw]">
                  <div className="flex flex-col ">
                    <label
                      htmlFor=""
                      className="font-medium lg:text-[1vw] sm:text-[2.5vw] text-[4vw]"
                    >
                      City
                    </label>
                    <input
                      type="text"
                      value={customerDetails?.city}
                      name="city"
                      className="lg:p-[0.8vw] sm:text-[2vw] sm:mt-[1vw]  p-[2vw] lg:text-[1vw] text-[3.5vw] bg-[#FAFAFA] mb-4 lg:w-[23vw] w-[42vw]"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor=""
                      className="font-medium lg:text-[1vw] sm:text-[2.5vw] text-[4vw]"
                    >
                      Postal code
                    </label>
                    <input
                      type="text"
                      value={customerDetails?.postcode}
                      name="postcode"
                      className="lg:p-[0.8vw] p-[2vw] sm:mt-[1vw]  sm:text-[2vw] lg:text-[1vw] text-[3.5vw] bg-[#FAFAFA] mb-4 lg:w-[24vw] w-[42vw]"
                    />
                  </div>
                </div>
              </form>
            </div>
          </article>
          <section>
            <article className="bg-white border-[1px] mt-[8vw] sm:ml-[7vw] lg:ml-[0vw] sm:mt-[5vw] ml-[8vw] rounded-xl w-[90vw]  border-[#F5F5F5] lg:w-[25vw] p-[2vw] lg:mt-[0vw] ">
              <p className="font-bold lg:text-[1.5vw] text-[5vw] sm:text-[3vw]">
                Summary
              </p>
              <div className="mt-[1vw] flex flex-col lg:gap-[0.8vw] gap-[4vw]">
                {checkoutDetail?.map((product, ind) => (
                  <div
                    className={`flex gap-[1vw] justify-between items-center`}
                    key={ind}
                  >
                    <p className="font-medium lg:text-[0.9vw] sm:text-[2vw] text-[3.5vw]">
                      {cartDetail ? "" : product?.name}
                    </p>
                    <p className="lg:text-[1vw] text-[2.5vw] font-bold lg:font-medium sm:text-[1.5vw] text-[#FF689A]">
                      $
                      {cartDetail
                        ? ""
                        : product?.sale_price
                        ? product?.sale_price
                        : product?.regular_price}
                    </p>
                  </div>
                ))}
              </div>
              <div className="border-[0.2px] border-b-[#EEEEEE] lg:mt-[1.5vw] mt-[3vw]"></div>
              <div className="flex justify-between mt-[1vw]">
                <p className="font-medium lg:text-[0.9vw] text-[3.5vw] lg:mt-[0vw] sm:text-[2vw] mt-[3vw]">
                  Subtotal
                </p>
                <p className="text-[#FF689A] font-bold lg:font-semibold lg:text-[1vw] text-[2.5vw] sm:text-[1.5vw] lg:mt-[0vw] mt-[3vw]">
                  ${cartDetail ? "0" : totalPrice}
                </p>
              </div>
              <Button
                type="submit"
                size="large"
                className="w-full lg:mt-[1.5vw] mt-[3vw] sm:text-[1.5vw] text-[2.5vw] lg:text-[0.8vw] bg-[#FF387A] hover:bg-[#FF387A] text-white"
                onClick={handlePayment}
              >
                Contnue to Payment
              </Button>
              <div
                id="paypal-button-container"
                className="lg:mt-[1vw] mt-[3vw]"
              ></div>
              <div className="border-[0.2px] border-b-[#EEEEEE] lg:mt-[1vw] mt-[3vw]"></div>
              <div className="flex  lg:translate-x-[-4.2vw] w-full  lg:mt-[1vw] mt-[3vw] lg:ml-[5vw] sm:ml-[4vw] ml-[-1vw]  lg:gap-[2vw] gap-[7.5vw]">
                {summaryOptions?.map((elem, ind) => (
                  <div
                    key={ind}
                    className="flex flex-col items-center sm:justify-center "
                  >
                    <img
                      src={elem.icon}
                      alt="icon"
                      className={`ml-[1vw] lg:w-[3vw] w-[10vw] sm:w-[6vw] ${
                        ind === 1 && "translate-x-[-0.5vw]"
                      }  ${ind === 0 && "translate-x-[-0.5vw]"} ${
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
    </main>
  );
};

export default page;
