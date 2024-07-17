"use client";
import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Sidebar from "../components/Common/Sidebar/Sidebar";
import { downloadData } from "@/data/data";
import axios from "axios";
import { toast } from "sonner";
import { useGlobalContext } from "@/context/globalState";
import Link from "next/link";

const DownloadProduct = ({
  img,
  desc,
  productId,
  orderKey,
  downloadKey,
  email,
}) => {
  const downloadFile = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/download", {
        responseType: "blob", // Important
      });
    } catch (error) {
      toast.error("Failed to download file:", error.message);
    }
  };

  return (
    <main className="flex w-full max-w-[80vw] sm:max-w-[30vw] lg:max-w-[20vw] flex-col items-center lg:items-start">
      <figure className="w-full max-w-[80vw] sm:max-w-[50vw] lg:max-w-[15vw]">
        <img src={img} alt="" className="w-full" />
      </figure>
      <p className="text-[4.5vw] sm:text-[2vw] lg:text-[1vw] mt-[2vw] lg:mt-[1vw] font-medium text-center lg:text-left">
        {desc}
      </p>
      <Link
        href={`https://develop.sonduckfilm.com/?download_file=${productId}&order=${orderKey}&email=${email}&key=${downloadKey}`}
        target="_blank"
      >
        <Button
          // onClick={downloadFile}
          variant="outlined"
          style={{ textTransform: "capitalize" }}
          className="py-[2vw] lg:py-[0.4vw] px-[5vw] lg:px-[1vw] w-full lg:w-auto text-[4vw] sm:text-[1.5vw] lg:text-[1vw] text-[#FF387A] hover:bg-[#FF387A] hover:text-white hover:border-white border-[#FF387A] rounded-lg mt-[2vw] lg:mt-[1vw]"
        >
          Download now
        </Button>
      </Link>
    </main>
  );
};

const Page = () => {
  const { customerID, fetchWooCommerceData } = useGlobalContext();
  const [fetchedPersonalOrders, setFetchedPersonalOrders] = useState([]);

  useEffect(() => {
    if (customerID && customerID !== "null") {
      const orders = fetchWooCommerceData(
        `wc/v3/orders/?customer=${customerID}`
      );
      orders.then((data) => {
        setFetchedPersonalOrders(data);
      });
    }
  }, [customerID]);
  console.log(fetchedPersonalOrders, "orders");

  return (
    <main className="bg-[#FAFAFA] w-full max-h-[500vh]">
      <Sidebar />
      <section className="rounded-lg w-full lg:max-w-[70vw] max-w-[90vw] lg:translate-x-[26vw] translate-x-[5vw] p-[2vw]">
        <h1 className="font-bold text-[6vw] sm:text-[3vw] lg:text-[2vw] ml-[5vw] lg:ml-0 translate-y-[15vw] lg:translate-y-[5vw] lg:translate-x-0 sm:translate-y-[8vw] sm:ml-[1vw]">
          Downloads
        </h1>
        <div className="p-[2vw] w-full bg-white border-[1px] border-[#F5F5F5] mt-[1vw] translate-y-[20vw] sm:translate-y-[8vw] lg:translate-y-[5vw] rounded-lg">
          <div className="flex flex-col lg:flex-row sm:flex-row lg:gap-[1vw] gap-[5vw] items-center">
            {fetchedPersonalOrders?.data?.map((elem, ind) => (
              <DownloadProduct
                key={ind}
                img={elem?.line_items[0]?.image?.src}
                desc={elem?.line_items[0]?.name}
                downloadKey={elem?.billing.address_2}
                productId={elem?.line_items[0]?.product_id}
                orderKey={elem?.order_key}
                email={elem?.billing.email}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Page;
