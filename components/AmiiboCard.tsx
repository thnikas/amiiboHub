"use client";

import { useState } from "react";
import Image from "next/image";

import { amiiboProps } from "@/types";
import AmiiboDetails from "./AmiiboDetails";

interface AmiiboCardProps {
  amiibo: amiiboProps;
}

const AmiiboCard = ({ amiibo }: AmiiboCardProps) => {
  const { 
    character,
    gameSeries,
    image,
  } = amiibo;

  const [isOpen, setIsOpen] = useState(false);//if true shows card details


  return (
    <>
      <button
        type="button"
        className="amiibo-amiibod group w-full cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-blue"
        onClick={() => setIsOpen(true)}
        aria-label={`View details for ${amiibo.name ?? character ?? "Amiibo"}`}
      >
        <div className="amiibo-amiibod__content">
          <h2 className="amiibo-amiibod__content-title">
            {gameSeries}: {character}
          </h2>
        </div>

        <div className="relative my-3 h-40 w-full object-contain">
          <Image
            src={image}
            alt={`${amiibo.name ?? character ?? "Amiibo"} model`}
            fill
            priority
            sizes='(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw'
            className='object-contain'
          />
        </div>
      </button>

      <AmiiboDetails isOpen={isOpen} closeModal={() => setIsOpen(false)} amiibo={amiibo} />
    </>
  );
};

export default AmiiboCard;
