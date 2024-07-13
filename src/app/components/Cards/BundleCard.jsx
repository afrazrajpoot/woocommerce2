import Image from "next/image";
import React from "react";

const BundleCard = ({
  price,
  regular_price,
  title,
  name,

  images,
  bgColor,
}) => {
  return (
    <main
      style={{ backgroundColor: bgColor }}
      className="w-full lg:max-w-[25vw] z-40 rounded-xl lg:rounded-t-[1vw] relative"
    >
      <picture className="w-full relative">
        <img
          src={images[0].src}
          alt="bundle"
          className="z-20 w-full h-[50vw] sm:h-[25vw] lg:h-[20vw] rounded-t-[1vw]"
        />
        <div className="absolute top-0 left-0 w-full  h-full bg-black opacity-40 rounded-t-[1vw] z-30"></div>
      </picture>
      <section className="w-full absolute top-0 left-0 p-[2vw] z-40">
        <nav className="flex items-center justify-between">
          <aside className="flex items-center">
            <Image
              src={"/img/adobe_ae.png"}
              height={50}
              alt="logo"
              width={50}
              className="cursor-pointer"
            />
            <Image
              src={"/img/adobe_pr.png"}
              height={50}
              alt="logo"
              width={50}
              className="cursor-pointer"
            />
          </aside>
          <p className="flex items-center">
            <span className="text-white font-semibold text-[4.3vw] sm:text-[2.3vw] lg:text-[1.3vw]">
              ${regular_price}
            </span>
            <strike className="text-white ml-[0.6vw] font-semibold text-[4vw] sm:text-[2vw] lg:text-[1vw]">
              ${price}
            </strike>
          </p>
        </nav>
      </section>
      <section className="w-full flex justify-between items-center absolute bottom-2 p-[2vw] z-40">
        <p className="text-white text-[4vw] sm:text-[2.3vw] lg:text-[1.3vw] font-semibold">
          {name}
        </p>
        <button className="text-[#fff] border-[2px] hover:bg-[#171717] hover:border-[#171717] font-semibold border-[#fff] text-[4vw] sm:text-[2vw] lg:text-[1vw] p-[2.5vw] md:p-[1vw] rounded-md w-full max-w-[30vw] sm:max-w-[15vw] lg:max-w-[9vw] text-center">
          View Here
        </button>
      </section>
    </main>
  );
};

export default BundleCard;
