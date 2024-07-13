import React from "react";

const Motion = ({ tick, info1, info2, info3, img }) => {
  return (
    <main
      className={`lg:flex lg:justify-center  lg:flex-row  lg:items-center relative  ${
        img === "/img/m2.png" && "flex-row-reverse"
      }`}
    >
      <article
        className={` flex flex-col gap-[3vw]  lg:gap-[1vw] ${
          img === "/img/m2.png" && "lg:absolute lg:right-[25vw] lg:top-[5.5vw] "
        }`}
      >
        <div className="flex">
          <figure>
            <img src={tick} alt="tick" />
          </figure>
          <p>{info1}</p>
        </div>
        <div className="flex">
          <figure>
            <img src={tick} alt="tick" />
          </figure>
          <p>{info2}</p>
        </div>
        <div className="flex">
          <figure>
            <img src={tick} alt="tick" />
          </figure>
          <p>{info3}</p>
        </div>
      </article>
      <figure
        className={`w-full lg:max-w-[25vw] ${
          img === "/img/m2.png" && "lg:absolute lg:top-[-3vw] lg:left-[27vw]"
        }`}
      >
        <img src={img} alt="img" className="w-full" />
      </figure>
    </main>
  );
};

export default Motion;
