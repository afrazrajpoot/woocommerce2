"use client";

import { Button } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import EastSharpIcon from "@mui/icons-material/EastSharp";
import { features } from "@/data/data";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Pack from "@/app/components/Cards/Pack";
import Footer from "@/app/components/Common/Footer/Footer";
import { useGlobalContext } from "@/context/globalState";
import { extractContent } from "@/app/utils/extractContent";
import Loading from "@/app/components/Common/Loading";
import { toast } from "sonner";
import {
  useDeleteSubscriptionMutation,
  useGetDataByIdMutation,
  useUpdateSubscriptionMutation,
} from "@/store/storeApi";
import { useRouter } from "next/navigation";
import Link from "next/link";

const ProductDetails = ({ params: { slug } }) => {
  const [productDetails, setProductDetails] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [id, setId] = useState(0);

  const {
    fetchWooCommerceData, setCartCount, showCart, productsAddedToCart, setProductsAddedToCart,
    customerDetails, CreateWooCommerceData, customerID, login, setCartDetail, isActiveSubscription
  } = useGlobalContext();
  const [subTotal, setSubtotal] = React.useState(0);
  const [loading, setLoading] = useState(false);
  const [getSubscriptionData] = useGetDataByIdMutation();
  const [ updateLimit] = useUpdateSubscriptionMutation();
  const [deleteSubscription] = useDeleteSubscriptionMutation();

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

  useEffect(() => {
    const storedProducts = JSON.parse(
      localStorage.getItem("productsAddedToCart")
    );
    if (storedProducts) {
      setProductsAddedToCart(storedProducts);
      setCartCount(storedProducts?.length);
    }
  }, []);

  const addToCartHandler = (product) => {
    const updatedCart = [...productsAddedToCart, product];
    setCartCount(updatedCart?.length);
    setProductsAddedToCart(updatedCart);
    localStorage.setItem("productsAddedToCart", JSON.stringify(updatedCart));
  };

  const fetchProducts = async () => {
    try {
      const data = await fetchWooCommerceData(`wc/v3/products?slug=${slug}`);
      const product = data?.data[0];
      setProductDetails(product);
      fetchRelatedProducts(product?.related_ids);
    } catch (error) {
      toast.error("Network error please try again later", {
        position: "top-right",
      });
    }
  };

  const fetchRelatedProducts = async (relatedIds) => {
    try {
      const relatedProductsData = await Promise.all(
        relatedIds.map((id) => fetchWooCommerceData(`wc/v3/products/${id}`))
      );
      setRelatedProducts(relatedProductsData);
    } catch (error) {
      toast.error("Network error please try again later", {
        position: "top-right",
      });
    }
  };

  useEffect(() => {
    if (slug) {
      fetchProducts();
    }
    const subscriptionId = localStorage.getItem("subscriptionId");
    setId(subscriptionId);
  }, [slug]);

  if (!productDetails) {
    return (
      <main className="w-full flex items-center justify-center h-screen">
        <Loading />
      </main>
    );
  }

  const extractedContent = extractContent(productDetails?.description);
  const mainVideo = extractContent(productDetails?.short_description);

  const settings = {
    dots: false, infinite: true, speed: 500, arrows: true,
    slidesToShow: 3,  slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2, slidesToScroll: 1, infinite: true },
      },
      { breakpoint: 1000, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 640, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  const fetchOrder = async (data) => {
    try {
      setLoading(true);
      const response = await CreateWooCommerceData(`wc/v3/orders`, data);
      setLoading(false);
    } catch (err) {
      toast.error("Please get subscription", {
        position: "top-right",
      });
      setLoading(false);
    }
  };
  const navigate = useRouter();
  function createSubscriptionOrder() {
    const lineItems = [
      {
        product_id: productDetails?.id,
        name: `${productDetails.categories[0]?.name} && ${productDetails.categories[1]?.name}`,
        quantity: 1,
        price: "0", // Ensure price is a string if required
        subtotal: "0", // Convert to string
        total: "0", // Convert to string
        taxes: [],
        meta_data: [],
        sku: productDetails?.[0]?.sku || "", // Ensure sku is a string, even if it's empty
        image: {
          src: productDetails?.images?.[0]?.src || "", // Ensure image is an object
        },
      },
    ];

    fetchOrder({
      payment_method: "paypal",
      payment_method_title: "PayPal",
      set_paid: true,
      customer_id: customerID,
      billing: {
        first_name: customerDetails?.first_name,
        last_name: customerDetails?.last_name,
        address_1: customerDetails?.address1,
        address_2: productDetails?.downloads[0].id,
        city: customerDetails?.city,
        state: customerDetails?.country,
        postcode: customerDetails?.postcode,
        country: customerDetails?.country,
        email: customerDetails?.email,
        phone: customerDetails?.phone,
      },
      shipping: {
        first_name: customerDetails?.first_name,
        last_name: customerDetails?.last_name,
        address_1: customerDetails?.address1,
        address_2: productDetails?.downloads[0].id,
        city: customerDetails?.city,
        state: customerDetails?.country,
        postcode: customerDetails?.postcode,
        country: customerDetails?.country,
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
  }

  async function handleLoginCheckout() {
    if(!login){
      toast.error("Please login first", {
        position: "top-right",
      });
      return
    }
   else if (!customerDetails) {
      toast.error("Please login first", {
        position: "top-right",
      });
      navigate.push("/accountdetails");
      return;
    } else if (!customerID || customerID === "null") {
      toast.error("Please register your account", {
        position: "top-right",
      });
      navigate.push("/accountdetails");
      return;
    }
  }

  async function hanldeSubscription() {
    setLoading(true);
 try {
  let res;
  if(id !== "null" && id !== "undefined"){
    res = await getSubscriptionData({ id: id });
  }
  if (!res?.data?.subscription) {
    toast.error("Please get subscription", {
      position: "top-right",
    });
    return;
  }
  const limit = res.data?.subscription?.downloadLimit;
  const lastDate = res.data?.subscription?.endDate;
  await updateLimit(id);
  if (limit <= 0) {
    toast.error("No more downloads available please get subscription pack", {
      position: "top-right",
    });
    return;
  }
  if (lastDate > new Date()) {
    deleteSubscription(id);
    toast.error("Your subscription is expired", {
      position: "top-right",
    });
    return;
  }

  createSubscriptionOrder();
  toast.success("Order create successfully", {
    position: "top-right",
  });
 } catch (error) {
  toast.error("Please try again later", {
    position: "top-right",
  })
 } finally {
  setLoading(false);
  navigate.push("/downloads");
 }
  }

  return (
    <>
      <main className="w-full relative overflow-x-hidden">
        <nav className="w-full max-w-[90vw] mx-auto mt-[20vw] sm:mt-[8vw] lg:mt-[4vw] p-[2vw]">
          <p className="text-[5.5vw] md:text-[2.5vw] text-[#171717] w-full md:max-w-[50vw] font-semibold">
            {productDetails?.name}
          </p>
          <section className="flex items-center mt-[5vw] sm:mt-[3vw] lg:mt-0 w-full sm:max-w-[50vw] lg:max-w-[30vw]">
            <p className="text-[#525252] md:w-full sm:max-w-[10vw] lg:max-w-[5vw] text-[4vw] sm:text-[2vw] lg:text-[1vw]">
              Category :{" "}
            </p>
            <Button
              variant="outlined"
              className="bg-[#FFFF] ml-[0.5vw] border-[1px] border-[#FF387A] font-medium hover:font-medium text-[3.5vw] sm:text-[2vw] lg:text-[1vw]  hover:text-white hover:shadow-md hover:border-[#ff387af6] hover:bg-[#ff387af6] text-[#FF387A] p-[2vw] md:p-[0.5vw] rounded-md w-full max-w-[35vw] sm:max-w-[18vw] lg:max-w-[10vw] text-center"
            >
              {productDetails?.categories?.[0]?.name}
            </Button>
          </section>
          <section className="w-full flex flex-col lg:flex-row items-start max-w-[90vw] mx-auto mt-[10vw] sm:mt-[5vw] lg:mt-[2vw]">
            {mainVideo?.videos?.[0] || extractedContent?.videos?.[0] ? (
              <iframe
                src={mainVideo?.videos?.[0] || extractedContent?.videos?.[0]}
                className="w-full max-w-[90vw] h-[60vw] sm:h-[50vw] lg:h-[35vw] sm:max-w-[85vw] lg:max-w-[60vw]"
                alt="image"
                allowFullScreen
              />
            ) : (
              <img
                src={
                  extractedContent?.images?.[0]?.src ||
                  productDetails.images[0]?.src
                }
                alt="store details"
                className="w-full max-w-[90vw] h-[60vw] sm:h-[50vw] lg:h-[35vw] sm:max-w-[85vw] lg:max-w-[60vw]"
              />
            )}
            <aside className="w-full mt-[10vw] sm:mt-[8vw] lg:mt-0 sm:max-w-[80vw] lg:max-w-[24vw] lg:ml-[2vw]">
              <section className="w-full shadow-md ml-[2vw] p-[5vw] lg:p-[1vw] rounded-lg">
                <nav className="flex items-center justify-between p-[2vw] md:p-[1vw]">
                  <p className="text-[#171717] text-[5vw] sm:text-[2vw] lg:text-[1vw] font-medium">
                    Price
                  </p>
                  <p className="flex items-center">
                    {productDetails?.sale_price && (
                      <span className="text-[6.3vw] sm:text-[2.5vw] lg:text-[1.3vw] text-[#FF387A] font-medium">
                        ${productDetails?.sale_price}
                      </span>
                    )}
                    <strike className="ml-[0.5vw] text-[5vw] sm:text-[2vw] lg:text-[1vw] text-[#171717]">
                      ${productDetails?.regular_price}
                    </strike>
                  </p>
                </nav>
                <Button
                  onClick={() => {
                    if (!customerID) {
                      handleLoginCheckout();
                      return;
                    }
                    addToCartHandler(productDetails);
                    setCartDetail(false);
                    showCart(true);
                  }}
                  variant="outlined"
                  className="bg-[#FFFF] ml-[0.5vw] mt-[1vw] sm:mt-[4vw] lg:mt-[1vw] border-[1px] border-[#FF387A] font-medium hover:font-medium text-[3.5vw] sm:text-[2vw] lg:text-[1vw]  hover:text-white hover:shadow-md hover:bg-[#ff387af6] hover:border-[#ff387af6] text-[#FF387A] p-[2.5vw] md:p-[0.5vw] rounded-md w-full text-center"
                >
                  Add to cart
                </Button>
                {!customerID || isActiveSubscription === false ? (
                  <Button
                    onClick={() => {
                      if (!login || !customerID) {
                        handleLoginCheckout();
                        return;
                      }else{
                        addToCartHandler(productDetails);
                      setCartDetail(false);
                      navigate.push("/checkout");
                      }
                    }}
                    variant="contained"
                    className="bg-[#FF387A] ml-[0.5vw] mt-[4vw] lg:mt-[1vw] border-[1px] border-[#FF387A] font-medium hover:font-medium text-[3.5vw] sm:text-[2vw] lg:text-[1vw] text-white hover:shadow-md hover:bg-[#ff387af6] hover:border-[#ff387af6] p-[2.5vw] md:p-[0.5vw] rounded-md w-full text-center"
                  >
                    {loading ? <Loading /> : "BUY NOW"}
                  </Button>
                ) : (
                  <Button
                    onClick={hanldeSubscription}
                    variant="contained"
                    className="bg-[#FF387A] ml-[0.5vw] mt-[4vw] lg:mt-[1vw] border-[1px] border-[#FF387A] font-medium hover:font-medium text-[3.5vw] sm:text-[2vw] lg:text-[1vw] text-white hover:shadow-md hover:bg-[#ff387af6] hover:border-[#ff387af6] p-[2.5vw] md:p-[0.5vw] rounded-md w-full text-center"
                  >
                    {loading ? <Loading /> : "Get This Pack"}
                  </Button>
                )}
                <section className="flex border-t-[1px] border-[#E5E5E5] mt-[3vw] lg:mt-[1vw] items-center justify-between p-[1vw]">
                  <p className="text-[#171717] font-medium text-[4vw] sm:text-[2vw] lg:text-[1vw]">
                    Compatibility
                  </p>
                  <aside className="flex items-center">
                    <Image
                      src={"/img/adobe_ae.png"}
                      height={30}
                      alt="logo"
                      width={50}
                      className="cursor-pointer"
                    />
                    <Image
                      src={"/img/adobe_pr.png"}
                      height={30}
                      alt="logo"
                      width={50}
                      className="cursor-pointer"
                    />
                  </aside>
                </section>
                <p className="flex mt-[0.5vw] text-[4vw] sm:text-[2vw] lg:text-[1vw] text-[#171717] items-center justify-between p-[1vw]">
                  <span>File size</span>
                  <span>65.43 MB</span>
                </p>
              </section>
              <footer className="w-full mt-[10vw] sm:mt-[5vw] lg:mt-[2vw] ml-[2vw] rounded-md p-[5vw] lg:p-[2vw] bg-[#FF689A1A]">
                <nav className="flex items-center">
                  <Image
                    src={"/img/access.png"}
                    height={30}
                    alt="logo"
                    width={30}
                    className="cursor-pointer"
                  />
                  <p className="text-[4vw] sm:text-[2vw] lg:text-[1vw] text-[#FF387A] ml-[0.5vw] font-medium">
                    Get Unlimited Access
                  </p>
                </nav>
                <p className="w-full mt-[1vw] lg:max-w-[21vw] text-[4vw] sm:text-[2vw] lg:text-[1vw] text-[#525252]">
                  Unlock this theme and get unlimited access to over 1000+
                  Premium templates.
                </p>
                <p className="w-full flex items-center mt-[1vw] lg:max-w-[20vw] text-[4vw] sm:text-[2vw] lg:text-[1vw] text-[#FF387A]">
                  Go Unlimited now <EastSharpIcon className="ml-[0.5vw]" />
                </p>
              </footer>
            </aside>
          </section>
        </nav>
        <section className="w-full flex flex-col lg:gap-[3vw] lg:flex-row items-start max-w-[90vw] mx-auto mt-[10vw] sm:mt-[5vw] lg:mt-[2vw]">
          <article className="w-full lg:max-w-[70vw]">
            <main className="flex flex-col lg:flex-col lg:gap-[5vw] items-start justify-evenly w-full">
              {extractedContent?.videos?.slice(0, 2).map((video, index) => (
                <main key={index} className="w-full">
                  <h1 className="text-[#171717] mb-[0.5vw] text-[5vw] md:text-[2vw] font-medium">{index == 0 ? "Related Video" : "All Templates (Promo Videos)"}</h1>
                  <iframe
                    className="rounded-[0.8vw] mt-[8vw] lg:mt-0 w-full max-w-[90vw] h-[60vw] sm:h-[50vw] lg:h-[25vw] sm:max-w-[85vw] lg:max-w-[41vw]"
                    key={index}
                    src={video}
                    alt="store details"
                    allowFullScreen
                  />
                </main>
              ))}
            </main>
            <h1 className="text-[#171717] text-[5vw] md:text-[2vw] mt-[10vw] sm:mt-[5vw] lg:mt-[2vw] font-semibold">
              Overview
            </h1>
            <p className="text-[#171717] text-[4vw] sm:text-[2vw] lg:text-[1vw] mt-[1vw]">
              Boost your video production to the next level
            </p>
            <p className="text-[#171717] text-[4vw] sm:text-[2vw] lg:text-[1vw] mt-[1vw] w-full md:max-w-[70vw]">
              Boost your video production to the next level Over 3333 dynamic,
              seamless transitions for any video project! Make your video
              visually interesting and amazing quickly, conveniently, and
              effortlessly! Slideshow, trailer, promo, music clip, broadcast,
              movie, documentary film, or presentation – every your project will
              be far more fascinating, dizzying, and professional!
            </p>
            <h1 className="text-[#171717] text-[5vw] md:text-[2vw] mt-[10vw] sm:mt-[5vw] lg:mt-[2vw] font-medium">
              Full Customization
            </h1>
            <p className="text-[#171717] text-[4vw] sm:text-[2vw] lg:text-[1vw] mt-[1vw] w-full md:max-w-[70vw]">
              Full Customization Control every transition with no experience in
              After Effects. You can easily change the color, direction, zoom
              point, and many other parameters. How? Check out this video
              review.
            </p>
            {extractedContent?.images?.[0] && (
              <Image
                src={extractedContent?.images?.[0]?.src}
                width={1000}
                height={1000}
                alt="store details"
                className="mt-[10vw] sm:mt-[6vw] lg:mt-[3vw]"
              />
            )}
            <p className="text-[#171717] text-[4.3vw] sm:text-[2.3vw] lg:text-[1.3vw] mt-[10vw] sm:mt-[3vw] lg:mt-[1vw]">
              What resolution projects are supported
            </p>
            <p className="text-[#171717] text-[4vw] sm:text-[2vw] lg:text-[1vw] mt-[5vw] sm:mt-[3vw] lg:mt-[1vw] w-full md:max-w-[60vw]">
              Handy Seamless Transitions support any resolution of your project.
              Starting with the minimum and ending with a full 4K! In fact, -
              these transitions are resizable. Moreover, transitions will work
              with any aspect ratio in the frame, such as portrait 9:16
            </p>
            {extractedContent.images?.length > 2 ? (
                <>
                {extractedContent.images.slice(1).map((image, i) => (
                  image?.src && (
                    <Image
                      key={i}
                      src={image.src}
                      width={1000}
                      height={1000}
                      alt="store details"
                      className="mt-[10vw] sm:mt-[6vw] lg:mt-[3vw]"
                    />
                  )
                ))}
              </>
            ) : (
              <>
                {extractedContent?.videos?.slice(2, 9).map((video, index) => (
                  <main key={index}>
                    <iframe
                      className="rounded-[0.8vw] mt-[10vw] sm:mt-[6vw] lg:mt-[3vw] w-full max-w-[90vw] h-[60vw] sm:h-[50vw] lg:h-[50vw] sm:max-w-[85vw] lg:max-w-[100%]"
                      key={index}
                      src={video}
                      width={1000}
                      height={1000}
                      alt="store details"
                      allowFullScreen
                    />
                  </main>
                ))}
              </>
            )}
          </article>
          <aside className="w-full lg:max-w-[24vw] p-[2vw] mt-[10vw] sm:mt-[5vw] lg:mt-[2vw] border-[1px] border-[525252] rounded-lg lg:ml-[2vw]">
            <h1 className="text-[5.5vw] sm:text-[2.5vw] lg:text-[1.5vw] text-[#171717] font-semibold">
              Features
            </h1>
            {features?.map((item, index) => (
              <section
                key={index}
                className="flex items-center mt-[5vw] sm:mt-[3vw] lg:mt-[1vw]"
              >
                <CheckCircleOutlineIcon className="text-[#FF387A] text-[4.3vw] sm:text-[2.3vw] lg:text-[1.3vw]" />
                <p className=" text-[4vw] sm:text-[2vw] lg:text-[1vw] font-medium text-[#171717] ml-[0.5vw]">
                  {item}
                </p>
              </section>
            ))}
            <footer className="w-full p-[0.6vw] mt-[10vw] sm:mt-[4vw] lg:mt-[2vw] flex items-center rounded-md border-[1px] border-[#D4D4D4]">
              <Image
                src={"/img/people.png"}
                width={100}
                height={100}
                className=""
              />
              <p className="text-[#171717] ml-[0.5vw] text-[4vw] sm:text-[2vw] lg:text-[1vw]">
                125 Sales
              </p>
            </footer>
          </aside>
        </section>
        <section className="w-full flex flex-col items-start max-w-[90vw] mx-auto my-[10vw] sm:mt-[5vw] lg:mt-[2vw]">
          <h1 className="text-[5vw] sm:text-[2.5vw] lg:text-[2vw] text-[#171717] font-semibold">
            Related Products
          </h1>
          <div className="grid grid-cols-1 gap-[2vw] w-full">
            <Slider {...settings}>
              {relatedProducts?.map((product, index) => {
                const { regular_price, sale_price, name , slug} =
                  product?.data;
                return (
                  <Link href={`/product/${slug}`} key={index} className="w-full block">
                    <Pack
                      discountedPrice={sale_price}
                      actualPrice={regular_price}
                      image={product?.data?.images?.[0]?.src}
                      title={name}
                    />
                  </Link>
                );
              })}
            </Slider>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default ProductDetails;
