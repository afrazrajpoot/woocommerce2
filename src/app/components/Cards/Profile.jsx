import Image from 'next/image'
import React from 'react'

const Profile = ({image, name, title, info}) => {
  return (
    <main className='bg-[#FFFFFF] shadow-md h-full sm:max-h-[50vw] lg:max-h-[30vw] w-full sm:max-w-[45vw] lg:max-w-[22vw] rounded-[5vw] md:rounded-[1vw] p-[5.5vw] md:p-[1.5vw]'>
        <Image src={image} alt="logo" width={80} height={80} className='rounded-full object-cover' />
        <h1 className='text-[4vw] sm:text-[2vw] lg:text-[1vw] mt-[6vw] md:mt-[1vw] text-[#171717] font-semibold'>{name}</h1>
        <h2 className='text-[4vw] sm:text-[2vw] lg:text-[1vw] mt-[2vw] md:mt-[1vw] text-[#171717]'>{title}</h2>
        <p className='text-[4vw] sm:text-[2vw] lg:text-[1vw] mt-[2.5vw] md:mt-[1.5vw] text-[#171717] text-medium w-full lg:max-w-[20vw]'>{info}</p>
    </main>
  )
}

export default Profile