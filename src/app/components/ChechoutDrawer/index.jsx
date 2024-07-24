"use client";
import React, { useEffect, useState } from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import DeleteIcon from "@mui/icons-material/Delete";
import { useGlobalContext } from "@/context/globalState";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Drawer } from "@mui/material";

const ChechoutDrawer = () => {
  const { active, setActive } = useGlobalContext();
  let cartData = [
    {
      img: "/img/upload.png",
      title: "DOWNLOAD RIGHT AWAY",
    },
    {
      img: "/img/lock.png",
      title: "SAFE CHECKOUT",
    },
    {
      img: "/img/customer.png",
      title: "CUSTOMER SUPPORT",
    },
  ];
  const [subtotal, setSubtotal] = useState(0);

  const removeFromCartHandler = (index) => {
    const updatedCart = productsAddedToCart.filter((_, i) => i !== index);
    setCartCount(updatedCart.length);
    setProductsAddedToCart(updatedCart);
    localStorage.setItem("productsAddedToCart", JSON.stringify(updatedCart));
  };
  const {
    setCartCount,

    cart,
    showCart,

    productsAddedToCart,
    setProductsAddedToCart,
    cartCount,
    cartDetail,
    setCartDetail,
  } = useGlobalContext();
  const [totalPrice, setTotalPrice] = useState(subtotal);

  const navigate = useRouter();
  function addCheckoutDetail() {
    showCart(false);
    setActive(true);
    navigate.push("/checkout");
  }

  useEffect(() => {
    const calculateSubtotal = () => {
      let total = 0;
      productsAddedToCart?.forEach((item) => {
        const price = item?.sale_price || item?.regular_price;
        if (price) {
          total += parseFloat(price);
        }
      });
      setSubtotal(total);
      localStorage.setItem("totalPrice", JSON.stringify(total));
    };
    calculateSubtotal();
  }, [productsAddedToCart]);
  // useEffect(() => {
  //   if (subtotal) {
  //     const storedSubtotal = localStorage.getItem("subtotal");
  //     setTotalPrice(storedSubtotal);
  //   }
  // }, [subtotal]);
  return (
    <Drawer anchor="right" open={cart} onClose={() => showCart(false)}>
      <main className="bg-[#FFFFFF] p-[2vw] w-full max-w-[60vw] lg:max-w-[25vw]">
        <nav className="flex items-center justify-between">
          <p className="lg:text-[1vw] text-[3vw] cursor-pointer text-[#171717]">
            Cart{" "}
            <span className="bg-[#F5F5F5] text-[#171717] rounded-full text-center p-[0.5vw] ml-[0.6vw]">
              {cartCount}
            </span>
          </p>
          <HighlightOffIcon
            className="cursor-pointer text-[3vw] lg:text-[1.5vw]"
            onClick={() => showCart(false)}
          />
        </nav>
        <section className="w-full mt-[2vw]">
          {productsAddedToCart?.map((item, index) => (
            <aside
              className="w-full flex items-start pb-[0.7vw] border-b-[0.15vw] border-[#F5F5F5] "
              key={index}
            >
              {!cartDetail && (
                <img
                  src={item?.images?.[0]?.src}
                  alt={item?.name}
                  className="w-full object-cover max-w-[10vw] lg:max-w-[6vw] h-[5vw]  lg:h-[4vw] rounded-[1vw]"
                />
              )}
              <section className="ml-[1vw]">
                {/* toSubString(0, 10) */}
                <h2 className="lg:text-[1vw] text-[2vw] font-medium text-[#171717]">
                  {cartDetail ? "" : item?.name?.slice(0, 30)}...
                </h2>
                <div className="flex items-center justify-between">
                  <p className="text-[1vw]">
                    $
                    {cartDetail
                      ? ""
                      : item?.sale_price
                      ? item?.sale_price
                      : item?.regular_price}
                  </p>
                  {cartDetail ? (
                    ""
                  ) : (
                    <DeleteIcon
                      className="cursor-pointer text-[#F87171] text-[3vw] lg:text-[1vw]"
                      onClick={() => removeFromCartHandler(index)}
                    />
                  )}
                </div>
              </section>
            </aside>
          ))}
        </section>
        <footer className="mt-[25vw]">
          <section className="flex justify-center">
            {cartData?.map((item, index) => (
              <main className="" key={index}>
                <figure className="flex justify-center">
                  <img src={item?.img} alt={item?.title} className=" " />
                </figure>
                <h2 className="lg:text-[0.9vw] text-[2vw] text-center font-medium text-[#171717]">
                  {item?.title}
                </h2>
              </main>
            ))}
          </section>
          <div className="border-[1px] border-b-[#E5E5E5] mt-[1vw]"></div>
          <section className="flex justify-between mt-[1vw]">
            <h2 className="font-medium text-[2vw] lg:text-[1vw]">Subtotal</h2>
            <p className="font-medium text-[#FF387A] text-[2vw] lg:text-[1vw]">
              {cartDetail ? "0" : subtotal}$
            </p>
          </section>

          <button
            onClick={addCheckoutDetail}
            className="w-full bg-[#FF387A] text-[#fff] p-[0.5vw] rounded-md mt-[1vw] ml-[0.5vw]"
          >
            continue to checkout
          </button>
        </footer>
      </main>
    </Drawer>
  );
};

export default ChechoutDrawer;
