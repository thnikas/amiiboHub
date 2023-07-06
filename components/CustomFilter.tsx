"use client";

import { Fragment, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Listbox, Transition } from "@headlessui/react";
import { updateSearchParams } from "@/utils";
import { arrayFilter,OptionProps } from "@/types";
import { useGlobalContext } from '../app/context/index';

interface amiibosFilter {
 
  title: string;
  options: OptionProps[];
  array:arrayFilter[]
  
}


export default function CustomFilter({ title, options,array }:amiibosFilter ) {
  const router = useRouter();
  const [selected, setSelected] = useState(options[0]); // State for storing the selected option

  // update the URL search parameters and navigate to the new URL
  const {  setAmiiboAr,setLimit, setLoader} = useGlobalContext();
  const handleUpdateParams = (e: { title: string; value: string }) => {
    setLoader(true)
    if(e.title=='Year'){
      setAmiiboAr(array)
    }
    const newPathName = updateSearchParams(title, e.value.toLowerCase());
    const year=new Date(e.value).getFullYear()
      
    
    const filteredData = array.filter(item => {
      const releaseDate = item.release?.eu || item.release?.jp||item.release.au||item.release.na
       return releaseDate ? new Date(releaseDate).getFullYear() === year : false;

     })
    setLimit(9)
    setAmiiboAr(filteredData)
    if(title=="types"){
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set("type",e.value.toLowerCase())
      localStorage.setItem('persistentScroll', window.scrollY.toString())

      const newPathname = `${window.location.pathname}?${searchParams.toString()}`;

      router.push(newPathname);
    }
  };

  

  return (
    <div className='w-fit'>
      <Listbox
        value={selected}
        onChange={(e) => {
          setSelected(e); // Update the selected option in state
          handleUpdateParams(e); // Update the URL search parameters and navigate to the new URL
        }}
      >
        <div className='relative w-fit z-10'>
          {/* Button for the listbox */}
          <Listbox.Button className='custom-filter__btn'>
            <span className='block truncate'>{selected.title}</span>
            <Image src='/chevron-up-down.svg' width={20} height={20} className='ml-4 object-contain' alt='chevron_up-down' />
          </Listbox.Button>
          {/* Transition for displaying the options */}
          <Transition
            as={Fragment} // group multiple elements without introducing an additional DOM node i.e., <></>
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Listbox.Options className='custom-filter__options'>
              {/* Map over the options and display them as listbox options */}
              {options.map((option) => (
                <Listbox.Option
                  key={option.title}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 px-4 ${
                      active ? "bg-primary-blue text-white" : "text-gray-900"
                    }`
                  }
                  value={option}
                >
                  {({ selected }) => (
                    <>
                      <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`} >
                        {option.title}
                      </span>
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}