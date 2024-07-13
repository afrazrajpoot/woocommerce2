import { footerLists, socialMediaLinks } from '@/data/data'
import { TextField } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className='w-full p-[2vw] bg-[#171717]'>
        <main className='w-full sm:max-w-[90vw] lg:max-w-[80vw] mx-auto mt-[2vw] flex flex-col md:flex-row items-start'>
        <section className='w-full md:max-w-[20vw]'>
        <Image src={"/img/logoText.png"} alt='logo' width={200} height={50} />
        <p className='text-[#525252] mt-[3.5vw] md:mt-[1.5vw] text-[4vw] sm:text-[1.5vw] lg:text-[1vw] w-full sm:max-w-[40vw] lg:max-w-[20vw]'>Market design is the process of designing markets to achieve specific goals.</p>
        </section>
        <section className='w-full md:max-w-[20vw] mt-[6vw] md:mt-0 md:ml-[10vw]'>
            <main className='grid grid-cols-1 md:grid-cols-2 gap-[5vw] md:gap-[1vw]'>
                {footerLists?.map((list, index)=> (
                <section key={index}>
                    <h1 className='text-[#A3A3A3] text-[4vw] sm:text-[2vw] lg:text-[1vw]'>{list?.title}</h1>
                    <div className='text-[#ffff] text-[3.9vw] sm:text-[1.5vw] lg:text-[0.9vw] mt-[3vw] md:mt-[1vw]'>
                        {list?.list?.map((item, index) => (
                            <Link className='block mt-[3vw] md:mt-[1vw] hover:text-[#FF387A]' href={item?.path} key={index}>{item?.title}</Link>
                        ))}
                    </div>
                </section>
                ))}
            </main>
        </section>
        <section className='w-full mt-[4vw] md:mt-[0vw] md:max-w-[40vw]'>
        <h1 className='text-[#ffff] text-[4vw] sm:text-[2vw] lg:text-[1vw]'>Newsletter</h1>
        <section className="flex w-full flex-col md:flex-row items-center mt-[3vw] md:mt-[1vw]">
      <TextField
            id="outlined-basic" placeholder="Enter your email address"
            InputProps={{
              className: "text-gray-800 bg-[#F6F6F6] focus:outline-none focus:shadow-md p-[0.3vw] focus:outline-none rounded-md",
              style: { padding: "0.3vw"},}}
              sx={{
                "& input": {
                  padding: "0.7vw", width: "21vw", fontSize: "1vw",
                  '@media (max-width: 1020px)': {
                    padding: "1vw", width: "77vw", fontSize: "2vw",
                  },
                  '@media (max-width: 630px)': {
                    padding: "2.5vw", width: "90vw", fontSize: "4vw",
                  }
  
                },
              }}
          />
          <button className="bg-[#FF689A] text-[4vw] mt-[3vw] md:mt-0 sm:text-[2vw] lg:text-[1vw] ml-[1vw] hover:shadow-md hover:bg-[#ff387af1] text-[#fff] p-[2.5vw] md:p-[0.9vw] rounded-md w-full sm:max-w-[10vw] lg:max-w-[7vw] text-center">Submit</button>
      </section>
        </section>
        </main>
        <article className='w-full sm:max-w-[90vw] lg:max-w-[80vw] mx-auto my-[6vw] md:my-[2vw] flex flex-col md:flex-row md:items-center'>
            <p className='text-[#FFFFFF] text-[3.9vw] sm:text-[1.5vw] lg:text-[0.9vw] w-full md:max-w-[30vw]'>© 2022 Company Name® Global Inc.</p>
            <section className='flex items-center w-full mt-[4vw] md:mt-0 max-w-[30vw] pl-[3vw]'>
                {socialMediaLinks?.map((item, index)=> (
                    <Link className='mx-[0.4vw]' href={item?.path} key={index}>
                        <Image src={item?.img} alt='social link' width={30} height={30} />
                    </Link>
                ))}
            </section>
            <p className='flex items-center text-[#fff] mt-[3vw] md:mt-0 text-[3.9vw] sm:text-[1.5vw] lg:text-[0.9vw]'>
                <span>Terms of Service</span>
                <span className='ml-[4vw]'>Privacy Policy</span>
            </p>
        </article>
    </footer>
  )
}

export default Footer