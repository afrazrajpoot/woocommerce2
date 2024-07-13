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
import Drawer from "@mui/material/Drawer";
import ChechoutDrawer from "@/app/components/ChechoutDrawer";

const ProductDetails = ({ params: { slug } }) => {
  const [productDetails, setProductDetails] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const {
    fetchWooCommerceData,
    setCartCount,
    openCartDrawer,
    cart,
    showCart,
    setOpenCartDrawer,
    productsAddedToCart,
    setProductsAddedToCart,
  } = useGlobalContext();

  const [subtotal, setSubtotal] = React.useState(0);

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

  const removeFromCartHandler = (index) => {
    const updatedCart = productsAddedToCart.filter((_, i) => i !== index);
    setCartCount(updatedCart.length);
    setProductsAddedToCart(updatedCart);
    localStorage.setItem("productsAddedToCart", JSON.stringify(updatedCart));
  };

  const fetchProducts = async () => {
    try {
      const data = await fetchWooCommerceData(`wc/v3/products?slug=${slug}`);
      const product = data?.data[0];
      // console.log(product?.related_ids, "products");
      setProductDetails(product);
      fetchRelatedProducts(product?.related_ids);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchRelatedProducts = async (relatedIds) => {
    try {
      const relatedProductsData = await Promise.all(
        relatedIds.map((id) => fetchWooCommerceData(`wc/v3/products/${id}`))
      );
      console.log(relatedProductsData, "relatedProductsData");
      setRelatedProducts(relatedProductsData);
    } catch (error) {
      console.error("Error fetching related products:", error);
    }
  };

  useEffect(() => {
    if (slug) {
      fetchProducts();
    }
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
    dots: false,
    infinite: true,
    speed: 500,
    arrows: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2, slidesToScroll: 1, infinite: true },
      },
      { breakpoint: 1000, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 640, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };
  return (
    <>
      <main className="w-full relative">
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
            <iframe
              src={mainVideo?.videos?.[0]}
              width={1000}
              height={700}
              alt="image"
              allowFullScreen
            />
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
                    addToCartHandler(productDetails);
                    // setOpenCartDrawer(true);
                    showCart(true);
                  }}
                  variant="outlined"
                  className="bg-[#FFFF] ml-[0.5vw] mt-[1vw] sm:mt-[4vw] lg:mt-[1vw] border-[1px] border-[#FF387A] font-medium hover:font-medium text-[3.5vw] sm:text-[2vw] lg:text-[1vw]  hover:text-white hover:shadow-md hover:bg-[#ff387af6] hover:border-[#ff387af6] text-[#FF387A] p-[2.5vw] md:p-[0.5vw] rounded-md w-full text-center"
                >
                  Add to cart
                </Button>
                <Button
                  onClick={() => setOpenCartDrawer(true)}
                  variant="contained"
                  className="bg-[#FF387A] ml-[0.5vw] mt-[4vw] lg:mt-[1vw] border-[1px] border-[#FF387A] font-medium hover:font-medium text-[3.5vw] sm:text-[2vw] lg:text-[1vw] text-white hover:shadow-md hover:bg-[#ff387af6] hover:border-[#ff387af6] p-[2.5vw] md:p-[0.5vw] rounded-md w-full text-center"
                >
                  Buy now
                </Button>
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
        <section className="w-full flex flex-col lg:flex-row items-start max-w-[90vw] mx-auto mt-[10vw] sm:mt-[5vw] lg:mt-[2vw]">
          <article className="w-full lg:max-w-[70vw]">
            <main className="flex flex-col md:flex-row items-start justify-evenly w-full">
              {extractedContent?.videos?.map((video, index) => (
                <main>
                  <iframe
                    className="rounded-[0.8vw]"
                    key={index}
                    src={video}
                    width={450}
                    height={300}
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
            <Image
              src={extractedContent?.images?.[0]?.src}
              width={1000}
              height={1000}
              alt="store details"
              className="mt-[10vw] sm:mt-[6vw] lg:mt-[3vw]"
            />
            <p className="text-[#171717] text-[4.3vw] sm:text-[2.3vw] lg:text-[1.3vw] mt-[10vw] sm:mt-[3vw] lg:mt-[1vw]">
              What resolution projects are supported
            </p>
            <p className="text-[#171717] text-[4vw] sm:text-[2vw] lg:text-[1vw] mt-[5vw] sm:mt-[3vw] lg:mt-[1vw] w-full md:max-w-[60vw]">
              Handy Seamless Transitions support any resolution of your project.
              Starting with the minimum and ending with a full 4K! In fact, -
              these transitions are resizable. Moreover, transitions will work
              with any aspect ratio in the frame, such as portrait 9:16
            </p>
            {extractedContent?.images?.slice(1)?.map((image, i) => (
              <Image
                key={i}
                src={image?.src}
                width={1000}
                height={1000}
                alt="store details"
                className="mt-[10vw] sm:mt-[6vw] lg:mt-[3vw]"
              />
            ))}
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
                const { images, regular_price, sale_price, name } =
                  product?.data;
                return (
                  <div key={index} className="w-full">
                    <Pack
                      discountedPrice={sale_price}
                      actualPrice={regular_price}
                      image={images?.[0]?.src}
                      title={name}
                    />
                  </div>
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
