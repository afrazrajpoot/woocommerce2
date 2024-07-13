"use client";
import { profileDetails } from "@/data/data";
import Sidebar from "../components/Common/Sidebar/Sidebar";
import { useGlobalContext } from "@/context/globalState";
import Link from "next/link";
 
const OrderDetails = ({image, title, price, onClick})=> {
  return (
    <main className="flex lg:mt-[1vw] mt-[3vw]">
      <img src={image} alt="img" className="lg:w-[4vw] w-[10vw] sm:w-[8vw]"/>
      <section className="ml-[1vw]">
        <p className="lg:text-[0.9vw] text-[4vw] font-medium sm:text-[2.5vw]">{title} </p>
        <div className="flex   justify-between w-[50vw] lg:w-[20vw]">
          <p className="text-[3vw] lg:text-[1vw] sm:text-[2vw]"> {price}$ </p>
          <figure onClick={onClick}>
            <img src="/img/download.png" alt="download" className="w-[4vw] lg:w-[1.5vw] ml-[60vw] lg:ml-[0vw] sm:w-[2vw]"/>
          </figure>
        </div>
      </section>
    </main>
  )
}

const page = () => {
  const {customerDetails, setCustomerDetails} = useGlobalContext()

  return (
    <main className="bg-[#FAFAFA] h-[110vh] sm:h-[270vh] lg:h-[110vh]">
      <Sidebar />
      <section className=" rounded-lg w-full lg:max-w-[50vw] max-w-[90vw] translate-y-[5vw] lg:translate-x-[26vw] translate-x-[5vw]">
        <h1 className="font-bold text-[6vw] lg:text-[2vw] lg:ml-[0vw] ml-[5vw] translate-y-[13vw] lg:translate-y-[0.5vw] sm:text-[3vw] sm:translate-y-[5vw] translate-x-[-4vw]  lg:translate-x-0">
          Dashboard
        </h1>
        <section className="grid lg:grid-cols-2 grid-cols-1 w-full gap-[4vw] sm:gap-[0vw] lg:gap-[2vw]">
          <article
            className=" p-[2vw]  bg-white border-[1px] border-[#F5F5F5] mt-[1vw] sm:translate-y-[7vw] translate-y-[15vw]
        lg:translate-y-0 rounded-lg w-[90vw] lg:ml-[0vw] lg:w-[25vw] ml-[1-2vw]"
          >
            <div className="flex flex-col items-center lg:gap-[1vw] ">
              <img
                src="/img/accountAvatar.png"
                alt="dashborad photo"
                className="w-full lg:max-w-[5vw] max-w-[20vw] sm:max-w-[9vw]"
              />
              <div>
                <p className="text-center font-bold lg:text-[1vw] text-[4vw] sm:text-[2.5vw]">
                  {customerDetails?.username}
                </p>
                <p className="text-center lg:text-[0.9vw] text-[3.5vw] font-bold text-[#475569] sm:text-[2vw]">
                  {customerDetails?.email}
                </p>
              </div>
            </div>
            <div className="flex gap-[0.8vw] justify-center items-center mt-[0.5vw]">
              <div className="flex gap-[0.3vw]">
                <figure className="">
                  <img
                    src="/img/location.png"
                    alt="location"
                    className="w-full lg:max-w-[1vw] max-w-[3vw]"
                  />
                </figure>
                <span className="text-[#475569] lg:text-[1vw] text-[2.5vw] sm:text-[1.5vw]">
                  {customerDetails?.country}
                </span>
              </div>
              <div
                className="border-[2px] border-[#CBD5E1] bg-[#CBD5E1] rounded-full"
                style={{ width: "0.2vw", height: "0.5vh" }}
              />
              <div className="flex gap-[0.3vw]">
                <span className="text-[#475569] lg:text-[1vw] text-[2.5vw] sm:text-[1.5vw]">
                  since
                </span>
                <figure>
                  <img
                    src="/img/star.png"
                    alt="email"
                    className="w-full lg:max-w-[1vw] max-w-[3vw]"
                  />
                </figure>
                <span className="text-[#475569] lg:text-[1vw] text-[2.5vw] sm:text-[1.5vw]">
                 {customerDetails?.date_created?.slice(0, 4)}
                </span>
              </div>
            </div>
            <aside>
              {profileDetails?.map((item, index)=> (
              <main className="" key={index}>
            <div className="border-[0.8px] border-b-[#CBD5E1] lg:mt-[1vw] mt-[2.5vw]"></div>
            <div className="flex justify-between lg:mt-[0.9vw] mt-[4vw]">
              <p className="text-[#475569] lg:text-[0.9vw] text-[4vw] font-medium sm:text-[2.5vw]">
                {item?.title}
              </p>
              <p className="text-[#475569] lg:text-[0.9vw] text-[3.5vw] font-bold sm:text-[2vw]">
                {customerDetails?.[item?.name] || item?.value}
              </p>
            </div>
              </main>
            ))}
            </aside>
            <div className="flex gap-[3vw] lg:items-center justify-center lg:mt-[1vw] mt-[3vw]">
              <Link href="/accountdetails">
              <button className="text-[#FF387A] font-bold lg:text-[1vw] text-[3.5vw] sm:text-[2vw]">
                change password
              </button>
              </Link>
              <Link href="/accountdetails">
              <button className="lg:py-[0.4vw] py-[1.5vw] lg:px-[1vw] px-[7vw] lg:text-[0.9vw] text-[3.5vw] hover:border-[#FF387A] hover:text-[#ffff] hover:bg-[#FF387A] text-[#FF387A] border-[1px] border-[#FF387A] lg:rounded-lg rounded-lg sm:text-[2vw]">
                Edit profile
              </button>
              </Link>
            </div>
          </article>
          <section>
            <article
              className=" p-[2vw] bg-white border-[1px] border-[#F5F5F5] mt-[1vw] sm:translate-y-[8vw] translate-y-[15vw]
        lg:translate-y-0 rounded-lg lg:w-[30vw] w-[90vw] lg:ml-[0vw] ml-[0.5vw] sm:ml-[0.4vw]"
            >
              <p className="lg:text-[1vw] text-[5vw] font-bold sm:text-[3vw]">
                Recent Orders 
              </p>
              <OrderDetails image={"/img/dashboardImg.png"} title={"1500+ Transitions Premiere Pro"} price={"48"} />
              <div className="border-[1px] border-b-[#EEEEEE] lg:mt-[1.3vw] mt-[8vw]"></div>
              <OrderDetails image={"/img/img1.png"} title={"1500+ Transitions Premiere Pro"} price={"48"} />
              <button className="lg:py-[0.4vw] py-[1.5vw] px-[1vw] w-full lg:mt-[1vw] text-[#FF387A] border-[1px] border-[#FF387A] rounded-lg mt-[8vw] lg:text-[1vw] text-[3vw] font-bold sm:text-[1.5vw]">
                View All
              </button>
            </article>
          </section>
        </section>
      </section>
    </main>
  );
};

export default page;
