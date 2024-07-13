"use client";

// import { bundleData } from "@/data/data";
import React, { useEffect } from "react";
import BundleCard from "../../Cards/BundleCard";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt"; // Make sure to import your icon
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useGlobalContext } from "@/context/globalState";

const Bundles = () => {
  const [bundleData, setBundleData] = React.useState([]);
  const { fetchWooCommerceData } = useGlobalContext();
  const fetchProducts = async () => {
    try {
      const resp = await fetchWooCommerceData("wc/v3/products?category=261");

      setBundleData(resp.data);
    } catch (error) {
      console.error("Error fetching products:", error.message);
    }
  };
  const CustomPrevArrow = ({ style, onClick }) => (
    <span
      style={{ ...style }}
      onClick={onClick}
      className={`text-vw text-black absolute top-[80vw] left-[1vw] cursor-pointer sm:top-[45vw] lg:top-[24vw] sm:left-[3vw] lg:left-[1vw] z-50`}
    >
      <ArrowRightAltIcon className="text-[#000000] text-[10.5vw] sm:text-[5.5vw] lg:text-[3.5vw] p-[3vw] md:p-[1vw] cursor-pointer hover:bg-green-50 hover:rounded-full hover:text-center rotate-180" />
    </span>
  );
  const CustomNextArrow = ({ style, onClick }) => (
    <span
      style={{ ...style }}
      onClick={onClick}
      className={`text-vw text-black absolute top-[80vw] left-[7vw] cursor-pointer sm:top-[45vw] lg:top-[24vw] sm:sm:left-[9vw] lg:left-[4vw]`}
    >
      <ArrowRightAltIcon className="text-[#000000] text-[10.5vw] sm:text-[5.5vw] lg:text-[3.5vw] p-[3vw] md:p-[1vw] cursor-pointer hover:bg-green-50 hover:rounded-full hover:text-center" />
    </span>
  );

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    arrows: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <CustomPrevArrow />,
    prevArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2, slidesToScroll: 1, infinite: true },
      },
      { breakpoint: 1000, settings: { slidesToShow: 1, slidesToScroll: 1 } },
      { breakpoint: 640, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <section className="w-full max-w-[80vw] mx-auto mt-[2vw] py-[15vw] sm:py-[10vw] lg:py-[8vw]">
      <h1 className="text-[5.5vw] sm:text-[3.5vw] lg:text-[2.5vw] text-[#171717] font-semibold">
        Get Bundles
      </h1>
      <p className="text-[#B0B0B0] text-[4vw] sm:text-[2vw] lg:text-[1vw] mt-[0.5vw]">
        Unlimited Packs Get Every Pack We Have + Every Future Pack!
      </p>
      <div className="w-full grid grid-cols-1 gap-[10vw] sm:gap-[5vw] lg:gap-[2vw] mt-[2vw]">
        <Slider {...settings}>
          {bundleData?.map((bundle, index) => (
            <BundleCard key={index} {...bundle} />
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Bundles;
