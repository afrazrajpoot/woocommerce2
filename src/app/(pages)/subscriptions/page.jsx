'use client';

import { Button } from "@mui/material";
import Sidebar from "../../components/Common/Sidebar/Sidebar";
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#FF689A' : '#FF689A',
  },
}));

const page = () => {
  return (
    <main className="bg-[#FAFAFA] ">
      <Sidebar />
      <div className=" w-full lg:max-w-[59vw] max-w-[80vw] m-auto lg:ml-[30vw] lg:translate-y-[6vw] translate-y-[25vw] sm:translate-y-[10vw]">
        <h1 className="font-bold lg:text-[1.5vw] text-[4vw] sm:text-[3vw]">
        Billing Status
        </h1>
        <aside className="w-full bg-white mt-[2vw] shadow-md rounded-[0.7vw] p-[0.7vw]">
            <section className="w-full border-[0.2vw] border-gray-50 rounded-[0.4vw] p-[2vw] lg:p-[0.7vw]">
                <nav className="bg-[#F5F5F5] p-[2vw] lg:p-[0.7vw] rounded-[0.5vw] shadow-md w-full">
                    <div className="flex items-center">
                        <img src="/img/box.png" alt="plan" className="w-[5.5vw] h-[5.5vw] sm:w-[3.5vw] sm:h-[3.5vw] lg:w-[2.5vw] lg:h-[2.5vw] rounded-full" />
                        <section>
                        <h1 className="font-bold lg:text-[1.7vw] text-[3.5vw] sm:text-[3vw] ml-[0.5vw]">Premium</h1>
                        <p className="lg:text-[1.3vw] text-[3vw] sm:text-[2.5vw] ml-[0.5vw]">Current Plan</p>
                        </section>
                    </div>
                <div className="lg:mt-[2vw] mt-[3vw]">
                <BorderLinearProgress variant="determinate" value={30} />
                </div>
                <article className="flex flex-col sm:flex-row items-center w-full mt-[0.7vw]">
                    <aside className="p-[2.2vw] sm:p-[1.2vw] rounded-[1.2vw] bg-[#ffff] m-[2.5vw] sm:m-[0.5vw] w-full">
                        <p className="lg:text-[1.3vw] text-[3vw] sm:text-[2.5vw] text-[#151515]">Daily Downloads</p>
                        <h1 className="lg:text-[1.8vw] text-[4vw] sm:text-[4.5vw] font-semibold text-[#151515]">10</h1>
                    </aside>
                    <aside className="p-[2.2vw] sm:p-[1.2vw] rounded-[1.2vw] bg-[#ffff] m-[2.5vw] sm:m-[0.5vw] w-full">
                        <p className="lg:text-[1.3vw] text-[3vw] sm:text-[2.5vw] text-[#151515]">Quota Left</p>
                        <h1 className="lg:text-[1.8vw] text-[4vw] sm:text-[3.5vw] font-semibold text-[#151515]">40</h1>
                    </aside>
                </article>
                </nav>
                <figure className="my-[4vw] sm:my-[2vw]">
                    <hr />
                </figure>
                <section className="w-full my-[1.5vw] p-[1vw]">
                <h1 className="font-bold lg:text-[1.7vw] text-[4vw] sm:text-[3.5vw]">Billing History</h1>
                <div className="flex items-center my-[2vw]">
                <section>
                <h1 className="font-medium lg:text-[1.3vw] text-[3vw] sm:text-[2.5vw] ml-[0.5vw]">Jan 21, 2022</h1>
                <p className="lg:text-[1vw] text-[3vw] sm:text-[2.5vw] ml-[0.5vw]">06:00</p>
                </section>
                <section className="ml-[2vw]">
                <h1 className="font-medium lg:text-[1.3vw] text-[3vw] sm:text-[2.5vw] ml-[0.5vw]">$178</h1>
                <p className="lg:text-[1vw] text-[3vw] sm:text-[2.5vw] text-[#FF689A] ml-[0.5vw]">Download invoice</p>
                </section>
                    </div>
                </section>
            </section>
                <footer className="flex flex-col sm:flex-row justify-center my-[2vw] items-center w-full">
                    <button className="bg-[#ED544E] text-white text-center rounded-md w-full hover:text-[#ED544E] hover:bg-white border-[0.1vw] p-[0.5vw] m-[2.5vw] sm:m-[0.5vw] border-[#ED544E]">Cancel Plan</button>
                    <button className="hover:bg-[#ED544E] hover:text-white text-center rounded-md w-full text-[#ED544E] bg-white border-[0.1vw] p-[0.5vw] m-[2.5vw] sm:m-[0.5vw] border-[#ED544E]">Change Plan</button>
                </footer>
        </aside>
      </div>
    </main>
  );
};

export default page;