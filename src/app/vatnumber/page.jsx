import { Button } from "@mui/material";
import Sidebar from "../components/Common/Sidebar/Sidebar";

const page = () => {
  return (
    <main className="bg-[#FAFAFA] ">
      <Sidebar />
      <div className=" w-full lg:max-w-[29vw] max-w-[70vw] m-auto lg:ml-[30vw] lg:translate-y-[6vw] translate-y-[25vw] sm:translate-y-[10vw]">
        <h1 className="font-bold lg:text-[1.5vw] text-[4vw] sm:text-[3vw]">
          VATE Number
        </h1>
        <div className="bg-white border-[1px] border-[#F5F5F5] rounded-lg p-[1vw] lg:mt-[1vw] mt-[3vw]">
          <p className="lg:text-[1vw] lg:mt-[0vw] mt-[3vw] text-[4vw] sm:text-[2.5vw]">
            VAT Number
          </p>
          <input
            type="text"
            className="bg-[#FAFAFA] p-[0.7vw] w-full focus:outline-none border-[1px] rounded-sm border-[#F5F5F5]"
            name=""
            id=""
          />
          <Button
            type="Save changes"
            size="large"
            className="w-full mt-4 text-[2vw] lg:text-[0.8vw] bg-[#FF387A] hover:bg-[#FF387A] text-white"
          >
            Submit
          </Button>
        </div>
      </div>
    </main>
  );
};

export default page;
