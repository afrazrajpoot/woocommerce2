"use client";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Sidebar from "../../components/Common/Sidebar/Sidebar";
import { useGlobalContext } from "@/context/globalState";
import GetAppIcon from "@mui/icons-material/GetApp";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

const Page = () => {
  const [data, setData] = useState({});

  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { fetchWooCommerceData, customerID } = useGlobalContext();

  useEffect(() => {
    if (customerID && customerID !== "null") {
      const orders = fetchWooCommerceData(
        `wc/v3/orders/?customer=${customerID}`
      );
      orders.then((data) => {
        setData(data);
      });
    }
  }, [customerID]);
  console.log(data);
  const handleOpen = (order) => {
    setSelectedOrder(order);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return (
    <main className="bg-[#FAFAFA]">
      <Sidebar />
      <section className="rounded-lg w-full lg:max-w-[50vw] max-w-[90vw] translate-y-[5vw] lg:translate-x-[26vw] translate-x-[5vw]">
        <h1 className="font-bold text-[6vw] lg:text-[2vw] lg:ml-[0vw] ml-[5vw] translate-y-[13vw] sm:translate-y-[6vw] translate-x-[-4vw] lg:translate-x-0 sm:text-[3vw]">
          Orders
        </h1>
        <div
          className="p-[2vw] bg-white border-[1px] border-[#F5F5F5] mt-[1vw] translate-y-[15vw] sm:translate-y-[7vw]
          lg:translate-y-0 rounded-lg flex flex-col lg:gap-[0vw] gap-[4vw]"
        >
          {data?.data?.line_items?.map((order, index) => (
            <React.Fragment key={index}>
              <div className="flex mt-[1vw] lg:gap-[0vw] gap-[3vw]">
                <figure className="w-full max-w-[20vw] lg:max-w-[4vw] sm:max-w-[10vw]">
                  <img src={order?.image?.src} alt="img" className="w-full" />
                </figure>
                <div className="ml-[1vw] flex-grow">
                  <p className="lg:text-[1vw] text-[4vw] font-bold sm:text-[2.5vw]">
                    {order.name}
                  </p>
                  <div className="flex justify-between w-full">
                    <p className="mt-[0.8vw] text-[3vw] lg:text-[0.9vw] font-bold sm:text-[2vw]">
                      ${order.price}{" "}
                      <Button
                        className="lg:text-[0.7vw] text-[2vw] sm:text-[1.5vw]"
                        variant="text"
                        sx={{
                          color: "#FF387A",
                          fontWeight: "bold",
                          textTransform: "none",
                          fontSize: "0.8vw",
                          padding: 0,
                          marginLeft: "1vw",
                          minWidth: "auto",
                          "&:hover": {
                            backgroundColor: "transparent",
                          },
                        }}
                        onClick={() => handleOpen(order)}
                      >
                        View Invoice
                      </Button>
                    </p>
                  </div>
                </div>
                <figure className="self-end w-full max-w-[5vw] lg:max-w-[1.2vw] sm:max-w-[2.5vw]">
                  <a
                    href={`https://develop.sonduckfilm.com/atomx/download/${
                      data.data?.meta_data.find(
                        (meta) => meta.key === "_atomx_order_code"
                      ).value[order.product_id]
                    }`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <GetAppIcon className="w-full cursor-pointer" />
                  </a>
                </figure>
              </div>
              {index < data.data?.line_items.length - 1 && (
                <div className="border-[1px] border-b-[#EEEEEE] mt-[1.3vw]"></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </section>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border-2 border-gray-300 shadow-lg p-6 rounded-lg max-w-lg w-full">
          {selectedOrder && (
            <>
              <h2 className="text-2xl font-bold mb-4" id="modal-title">
                Invoice
              </h2>
              <div className="space-y-2" id="modal-description">
                <p>
                  <strong>Order Name:</strong> {selectedOrder.name}
                </p>
                <p>
                  <strong>Price:</strong> ${selectedOrder.price}
                </p>
                <p>
                  <strong>Quantity:</strong> {selectedOrder.quantity}
                </p>
                <p>
                  <strong>Subtotal:</strong> ${selectedOrder.subtotal}
                </p>
                <p>
                  <strong>Total:</strong> ${selectedOrder.total}
                </p>
                <p>
                  <strong>Billing Address:</strong>{" "}
                  {`${data.data?.billing?.first_name} ${data.data?.billing?.last_name}, ${data.data?.billing?.address_1}, ${data.data?.billing?.address_2}, ${data.data?.billing?.city}, ${data.data?.billing?.state}, ${data.data?.billing?.postcode}, ${data.data?.billing?.country}`}
                </p>
                <p>
                  <strong>Email:</strong> {data.data?.billing?.email}
                </p>
                <p>
                  <strong>Phone:</strong> {data.data?.billing?.phone}
                </p>
                {/* Add more order details as needed */}
              </div>
              <div className="mt-6 flex justify-end">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleClose}
                  className="mr-2"
                >
                  Close
                </Button>
              </div>
            </>
          )}
        </Box>
      </Modal>
    </main>
  );
};

export default Page;
