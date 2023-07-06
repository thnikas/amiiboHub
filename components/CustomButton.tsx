"use client";

import Image from "next/image";

import { CustomButtonProps } from "@/types";

const Button = ({ isDisabled, btnType, containerStyles, textStyles, title, rightIcon, handleClick,handleMouseIn,handleMouseOut,iconStyles }: CustomButtonProps) => (
 //all the button properties that can be used
  <button
    disabled={isDisabled}
    type={btnType || "button"}
    className={`custom-btn ${containerStyles}`}
    onClick={handleClick}
    onMouseEnter={handleMouseIn}
    onMouseLeave={handleMouseOut}
    id="flip-button"
  >
    <span className={`flex-1 ${textStyles}`}>{title}</span>
    {rightIcon && (
      <div  className={`relative w-6 h-6 ${iconStyles}`}>
        <Image
          src={rightIcon}
          alt="arrow_left"
          fill
          className="object-contain"
        />
      </div>
    )}
  </button>
);

export default Button;