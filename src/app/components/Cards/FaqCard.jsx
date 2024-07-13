import React from 'react'

const FaqCard = ({img, name, desc, icon, index, brandName, avatar}) => {
  return (
    <main className={`flex flex-col  gap-[1.4vw] lg:gap-[0vw]  sm:gap-[1vw]  ${
      index === 1 &&
      "border-[1px] border-[#F5F5F5] rounded-lg p-[0.6vw]"
    } `}
  >
    <header className="">
      <figure>
        <img src={img} alt={name} className="" />
      </figure>
      <p className="lg:text-[0.8vw] text-[3vw] mt-[1vw] lg:mt-[1vw] font-medium sm:text-[1.5vw]">
        {desc}
      </p>
    </header>
    <figure className="border-[1px] border-[#F5F5F5] sm:mt-[1vw] p-[0.1vw] mt-[6vw] lg:mt-[1vw] rounded-full sm:w-[6vw] w-[10.5vw] lg:w-[3vw]   flex ">
      <img src={icon} alt="icon" />{" "}
      <span className="lg:text-[0.8vw] text-[3vw] sm:text-[1.5vw]">
        5.0
      </span>
    </figure>
    <figure className="flex gap-[1vw] mt-[6vw] sm:mt-[1vw] lg:mt-[1vw]">
      <figure>
        <img src={avatar} alt={name} className="" />
      </figure>
      <div>
        <p className="lg:text-[1vw] text-[3vw] sm:text-[1vw] font-bold">
          {name}
        </p>
        <p className="lg:text-[1vw] text-[3vw] sm:text-[1vw]">
          {brandName}
        </p>
      </div>
    </figure>
  </main>
  )
}

export default FaqCard