"use client";
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import ImportExportSharpIcon from "@mui/icons-material/ImportExportSharp";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Link from "next/link";
// import Footer from "../components/Common/Footer/Footer";
import { useGlobalContext } from "@/context/globalState";
import Pack from "../../Cards/Pack";
import SubscriptionPass from "./SubscriptionPass";
import Bundles from "./Bundles";
import Footer from "../../Common/Footer/Footer";
import Loading from "../../Common/Loading";

const Categories = () => {
  const btnData = ["All Products", "Premiere Pro", "After Effects"];
  const [products, setProducts] = useState([]);
  const [selectedBtn, setSelectedBtn] = useState("All Products");
  const [currentPage, setCurrentPage] = useState(1);
  const { fetchWooCommerceData } = useGlobalContext();
  const [featurePackages, setFeaturePackages] = useState([]);
  const itemsPerPage = 6;

  const fetchProducts = async (categorySlug = "", page = 1) => {
    try {
      let params = { per_page: itemsPerPage, page };

      if (categorySlug) {
        const categoriesResponse = await fetchWooCommerceData(
          "wc/v3/products/categories",
          { params: { per_page: 100 } }
        );
        const categories = await categoriesResponse.data;
        const category = categories?.find((cat) => cat.slug === categorySlug);
        if (category) {
          params = { ...params, category: category.id };
        } else {
          console.error("Category not found");
          return;
        }
      }

      const response = await fetchWooCommerceData("wc/v3/products", { params });
      const data = response.data;
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error.message);
    }
  };
  const handleClick = (label) => {
    setSelectedBtn(label);
    setCurrentPage(1);
    const categorySlug =
      label === "All Products"
        ? ""
        : label === "Bundle"
        ? "bundles"
        : label.toLowerCase().replace(/\s+/g, "-");
    fetchProducts(categorySlug, 1);
  };
  // console.log(featurePackages, "mydata");
  const fetchFeaturePack = () => {
    const packs = fetchWooCommerceData("wc/v3/products?featured=false")
      .then((data) => setFeaturePackages(data?.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchFeaturePack();
    fetchProducts();
  }, []);

  useEffect(() => {
    const categorySlug =
      selectedBtn === "All Products"
        ? ""
        : selectedBtn.toLowerCase().replace(/\s+/g, "-");
    fetchProducts(categorySlug, currentPage);
  }, [selectedBtn, currentPage]); // Dependency array with currentPage and selectedBtn changes

  const CustomPrevArrow = ({ style, onClick }) => (
    <span
      style={{ ...style }}
      onClick={onClick}
      className={`text-vw text-black absolute cursor-pointer sm:top-[20vw] lg:top-[12vw] sm:-left-[35vw] lg:-left-[29vw] z-50`}
    >
      <ArrowRightAltIcon className="text-[#000000] top-[10vw] text-[10.5vw] sm:text-[5.5vw] lg:text-[3.5vw] p-[3vw] md:p-[1vw] cursor-pointer hover:bg-green-50 hover:rounded-full hover:text-center rotate-180" />
    </span>
  );

  const CustomNextArrow = ({ style, onClick }) => (
    <span
      style={{ ...style }}
      onClick={onClick}
      className={`text-vw text-black absolute cursor-pointer sm:top-[20vw] lg:top-[12vw] sm:sm:-left-[30vw] lg:-left-[26vw]`}
    >
      <ArrowRightAltIcon className="text-[#000000] text-[10.5vw] sm:text-[5.5vw] lg:text-[3.5vw] p-[3vw] md:p-[1vw] cursor-pointer hover:bg-green-50 hover:rounded-full hover:text-center" />
    </span>
  );

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    arrows: true,
    slidesToShow: 2,
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

  return (
    <>
      <main className="w-full">
        <section className="flex w-full max-w-[80vw] mx-auto mt-[6vw] pt-[3vw] md:mt-[2vw] flex-col md:flex-row items-start">
          <aside className="w-full sm:max-w-[35vw] lg:max-w-[28vw] ">
            <h1 className="text-[5.5vw] md:text-[2.5vw] text-[#171717] font-bold">
              Featured Single Packs
            </h1>
            <p className="text-[#404040] text-[4vw] sm:text-[2vw] lg:text-[1vw] mt-[1vw]">
              Find what you need on Sonduck Film, Discover millions of video
              templates, stock footage, audio & more. All for one low cost.
            </p>
          </aside>
          <figure className="grid grid-cols-1 w-full lg:max-w-[60vw] mt-[5vw] md:mt-0">
            {featurePackages?.length == 0 ? (
              <main className="w-full lg:max-w-[60vw] flex items-center h-[15vw] justify-center">
                <Loading />
              </main>
            ) : (
              <Slider {...settings}>
                {featurePackages?.map((packages, index) => {
                  const { images, regular_price, sale_price, name, slug } =
                    packages;
                  return (
                    <Link
                      href={`/product/${slug}`}
                      key={index}
                      className="w-full px-[1vw]"
                    >
                      <Pack
                        discountedPrice={sale_price}
                        actualPrice={regular_price}
                        image={images[0]?.src}
                        title={name}
                      />
                    </Link>
                  );
                })}
              </Slider>
            )}
          </figure>
        </section>
        <nav className="flex mt-[20vw] sm:mt-[8vw] lg:mt-[5vw] w-full max-w-[90vw] mx-auto items-center justify-between p-[3vw]">
          <section className="grid grid-cols-3 gap-[1vw]  w-full md:max-w-[30vw] items-center">
            {btnData.map((label, index) => (
              <Button
                key={index}
                style={{ textTransform: "capitalize" }}
                startIcon={
                  label === "Filter" ? <ImportExportSharpIcon /> : null
                }
                variant="outlined"
                className={` ml-[0.5vw] border-[1px] ${
                  selectedBtn === label
                    ? "bg-[#FF387A] text-[#ffff] border-[#FF387A]"
                    : "text-[#525252] border-[#525252]"
                } hover:bg-[#FF387A] hover:text-[#ffff] hover:border-[#FF387A] font-medium hover:font-medium text-[3.5vw] sm:text-[2vw] lg:text-[1vw] hover:shadow-md p-[2.5vw] md:p-[0.5vw] rounded-md w-full max-w-[30vw] sm:max-w-[15vw] lg:max-w-[8vw] text-center`}
                onClick={() => handleClick(label)}
              >
                {label}
              </Button>
            ))}
          </section>
        </nav>
        <section className="w-full max-w-[80vw] mx-auto mt-[5vw] md:mt-[2vw]">
          <h1 className="text-[5.5vw] md:text-[2.5vw] text-[#171717] font-bold">
            Get Single Packs
          </h1>
        </section>
        <section className="w-full max-w-[90vw] ml-[4vw] mx-auto mt-[6vw] md:mt-[2vw]">
          {products?.length === 0 ? (
            <main className="w-full flex items-center justify-center h-[30vw]">
              <Loading />
            </main>
          ) : (
            <>
              <figure className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-[5vw] md:mt-0 gap-[10vw] md:gap-[2vw] items-start">
                {products?.map((product, index) => {
                  const { images, regular_price, sale_price, name, slug } =
                    product;
                  return (
                    <Link
                      href={`/product/${slug}`}
                      key={index}
                      className="w-full"
                    >
                      <Pack
                        discountedPrice={sale_price}
                        actualPrice={regular_price}
                        image={images[0]?.src}
                        title={name}
                      />
                    </Link>
                  );
                })}
              </figure>

              <Link href={"/store"}>
                {" "}
                <button className="w-full max-w-[10vw] ml-[39vw] bg-[#FF387A] text-white font-bold text-[3.5vw] sm:text-[2vw] lg:text-[1vw] mt-[5vw] p-[0.5vw] rounded-md md:mt-0">
                  View All
                </button>
              </Link>
            </>
          )}
        </section>
      </main>
    </>
  );
};

export default Categories;
