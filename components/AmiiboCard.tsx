"use client";

import { useState } from "react";
import Image from "next/image";

import { amiiboProps } from "@/types";
import CustomButton from "./CustomButton";
import AmiiboDetails from "./AmiiboDetails";

interface amiiboamiibodProps {
  amiibo: amiiboProps;
}

const amiiboamiibod = ({ amiibo }: amiiboamiibodProps) => {
  const { 
    character,
    gameSeries,
    image, } = amiibo;

  const [isOpen, setIsOpen] = useState(false);//if true shows card details


  return (
    <div className="amiibo-amiibod group">
      <div className="amiibo-amiibod__content">
        <h2 className="amiibo-amiibod__content-title">
        {gameSeries}: {character} 
        </h2>
      </div>

      

      <div className='relative w-full h-40 my-3 object-contain'>
        <Image src={image} alt='amiibo model' fill priority className='object-contain' />
      </div> 

      <div className='relative flex w-full mt-2'>
        
        <div className="amiibo-amiibod__btn-container">
          <CustomButton
            title='View More'
            containerStyles='w-full py-[16px] rounded-full bg-primary-blue'
            textStyles='text-white text-[14px] leading-[17px] font-bold'
            rightIcon='/right-arrow.svg'
            handleClick={() => setIsOpen(true)}
          />
        </div>
      </div>

      <AmiiboDetails isOpen={isOpen} closeModal={() => setIsOpen(false)} amiibo={amiibo} />
    </div>
  );
};

export default amiiboamiibod;