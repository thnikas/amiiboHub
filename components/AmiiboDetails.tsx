"use client"
import { Fragment, useState } from "react";
import Image from "next/image";

import { Dialog, Transition } from "@headlessui/react";
import { amiiboProps,AmiiboDetailsArrayProps } from "@/types";
import  CustomButton  from "./CustomButton";
import ReactCardFlip  from "react-card-flip";
import  {AmiiboDetailsData}  from "@/constants";
interface amiiboDetailsProps {
  isOpen: boolean;
  closeModal: () => void;
  amiibo: amiiboProps;
  
}


const amiiboDetails = ({ isOpen, closeModal, amiibo }: amiiboDetailsProps) => {
  const [hover, setHover]=useState(false)
  const dateParts = amiibo.release?.au?.split("-")//change the form of the date 
  ?? amiibo.release?.eu?.split("-")
  ?? amiibo.release?.jp?.split("-")
  ?? amiibo.release?.na?.split("-")
  ?? null;const convertedDate = dateParts?`${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`:null;
  function searchOnAmazon() {//on button click go to amazon and search the specific item
    const title = amiibo.name+" "+'Amiibo'; // Replace with your specific title
  
    // Encode the title to be included in the URL
    const encodedTitle = encodeURIComponent(title);
  
    // Redirect to the Amazon search page with the encoded title
    window.open(`https://www.amazon.com/s?k=${encodedTitle}`, "_blank");
  }
  const testF=()=>{
    setHover(!hover)
  }
  return( <>
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={closeModal}>
        <Transition.Child //animation when card details is showed
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-25' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-out duration-300'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel className='relative w-full max-w-lg max-h-[90vh] overflow-y-auto transform rounded-2xl bg-white p-6 text-left shadow-xl transition-all flex flex-col gap-5'>
                <button
                  type='button'
                  className='absolute top-2 right-2 z-10 w-fit p-2 bg-primary-blue-100 rounded-full'
                  onClick={closeModal}
                >
                  <Image
                    src='/close.svg'
                    alt='close'
                    width={20}
                    height={20}
                    className='object-contain'
                  />
                </button>

               <div className='flex-1 flex flex-col gap-1 '>
                  <div className='relative w-full  bg-center rounded-lg custom-height'>
                    <Image src={amiibo.image} alt='amiibo model' fill priority className='object-contain custom-height' />
                  </div>
                </div> 

                <div className='flex-1 flex flex-col gap-3 card-contain'>
                  <div className="amiibod-items">
                    <h1 className='font-semibold text-xl capitalize '>Name:</h1> 
                    <h2 className='font-normal text-xl capitalize space-y-2'>{amiibo.name}</h2>
                  </div>

                  <div className="amiibod-items">
                    <h1 className='font-semibold text-xl capitalize '>Game Series:</h1> 
                    <h2 className='font-normal text-xl capitalize space-y-2'>{amiibo.gameSeries}</h2>
                  </div>

                    
                  <div className="amiibod-items">
                    <h1 className='font-semibold text-xl capitalize '>Release:</h1> 
                    <h2 className='font-normal text-xl capitalize space-y-2'>{convertedDate}</h2>
                  </div>
                  
                  
                 {AmiiboDetailsData.map((item,index) => {
               
                    return (item.name===amiibo.name?  
                      // JSX elements for each item
                      <div className="amiibod-items-des" key={index}>
                        <h1 className='font-semibold text-xl capitalize self-center pb-2'>Description</h1>                  
                        <h2 key={index} className='amiibo-amiibod__icon-text'>{item.des}</h2>
                      </div>
                      :null
                    );
                  })}               
                </div>
                
                
                <ReactCardFlip isFlipped={hover} //custom button that flips when mouse is entered
                  flipDirection="vertical">
                  <CustomButton
                    title='Buy now'
                    containerStyles='w-full py-[16px] rounded-full bg-orange-500'
                    textStyles='text-white text-[14px] leading-[17px] font-bold'
                    rightIcon='/right-arrow.svg'
                    handleMouseIn={testF}

                  />
                  <CustomButton
                    title='Go to Amazon'
                    containerStyles='w-full py-[16px] rounded-full bg-gray-800'
                    textStyles='text-white text-[14px] leading-[17px] font-bold'
                    handleClick={searchOnAmazon}
                    rightIcon='/amazon2.svg'
                    handleMouseOut={testF}
                  />
                </ReactCardFlip>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  </>)
 
}

export default amiiboDetails;