"use client";
import Image from 'next/image'
import React from 'react'

type HomeProps = {
    img: string;
    title: string;
    description: string;
    className: string;
    handleClick: () => void;
}
const HomeCard = ({ img, title, description, className, handleClick }: HomeProps) => {
    return (
        <div className={`${className} px-5 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-[14px]`} onClick={handleClick}>
            <div className='rounded-[10px] flex-center  cursor-pointer glassmorphism size-12'>
                <Image src={img} alt={title} width={27} height={27} />
            </div>
            <div className='flex flex-col gap-2'>
                <h2 className="font-bold text-2xl">{title}</h2>
                <p className='text-lg font-normal'>{description}</p>
            </div>
        </div>
    )
}

export default HomeCard