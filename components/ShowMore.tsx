"use client";

import { ShowMoreProps } from "@/types";
import { CustomButton } from "@/components";
import { AmiiboCard } from "@/components";
import { useEffect, useState } from "react";
import { useGlobalContext } from '../app/context/index';
const ShowMore = ({ array }: ShowMoreProps) => {//show more component is used so all  results are not be seem in the beginning only a specific number
  const { amiiboAr, setAmiiboAr, limit, setLimit,loader,setLoader} = useGlobalContext();
  const amiiboArray=array.amiibo
  const [buttonPr, setButtonPr]=useState(false)
  const [first, setFirst]=useState(true)
  const isDataEmpty =  amiiboAr.length < 1 || !amiiboAr;

  const changeLimit = () => {//limit shows how many array entries will be seen
    setLimit(limit+12)
    setButtonPr(true)
  }
  if(first){//used for the first render
    setAmiiboAr(amiiboArray)
    setFirst(false)
  }

  useEffect(()=>{
    setAmiiboAr(amiiboArray)
      
  },[array.amiibo])
  
  return (
    !loader?  !isDataEmpty ?
    <section>
      <div className='home__amiibos-wrapper'>
        {amiiboAr? amiiboAr?.map((amiibo:any,index:number) => (
         index<limit?<AmiiboCard key={index} amiibo={amiibo} />:null
         
       )):null}
       
      </div>
  
      <div className="w-full flex-center gap-5 mt-10">
          {limit<=amiiboAr.length? <CustomButton //when there is no more data the show more button vanished
            btnType="button"
            title="Show More"
            containerStyles="bg-primary-blue rounded-full text-white"
            handleClick={changeLimit}
          />:null}
         
        
      </div>
      </section> : 
      <div className='home__error-container'> 
      {/* {when there are not values in the array this message shows up} */}
            <h2 className='text-black text-xl font-bold'>Oops, no results</h2>
           
      </div>
   :null
    
  );
};

export default ShowMore;
