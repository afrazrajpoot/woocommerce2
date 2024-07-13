import Image from 'next/image'
import React from 'react'

const Pack = ({discountedPrice, actualPrice, image, title}) => {
  return (
    <main className='relative w-full sm:max-w-[40vw] cursor-pointer lg:max-w-[25vw] m-[1vw]'>
      <figure className='w-full sm:h-[27vw] lg:h-[20vw]'>
      <img src={image} alt={title} className='w-full h-full rounded-md' />
      </figure>
        <p className='text-[3.9vw] sm:text-[2vw] lg:text-[1vw] mt-[2.7vw] md:mt-[0.7vw] font-semibold'>{title}</p>
        <div className="flex items-center mt-[1vw] justify-between">
            <p className='flex items-center'>
                <span className='text-[#FF689A] text-[3.9vw] font-semibold sm:text-[2vw] lg:text-[1vw]'>${discountedPrice ? discountedPrice : actualPrice}</span>
                <strike className='text-[#171717] ml-[0.6vw] text-[3.8vw] sm:text-[1.5vw] lg:text-[0.9vw] font-medium'>${actualPrice}</strike>
            </p>
            <Image src={"/img/people.png"} alt='people' height={60} width={60} className='cursor-pointer' />
        </div>
    </main>
  )
}

export default Pack