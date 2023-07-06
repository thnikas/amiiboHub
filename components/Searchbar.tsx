"use client"
import { useState } from "react"
import {SearchManufacturer} from "./"
import Image from "next/image";
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useCallback, useEffect } from 'react'
import { useGlobalContext } from "@/app/context";
const SearchButton = ({ otherClasses }: { otherClasses: string }) => (
    <button type='submit' className={`-ml-3 z-10 ${otherClasses}`}>
      <Image
        src={"/magnifying-glass.svg"}
        alt={"magnifying glass"}
        width={40}
        height={40}
        className='object-contain'
      />
    </button>
  );
const Searchbar=()=> {
  const [series,setSeries]=useState('')
  const [name, setName] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const {loader,setLoader} = useGlobalContext();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (series.trim() === "" && name.trim() === "") {
      return alert("Please provide some input");
    }

    updateSearchParams(name.toLowerCase(), series.toLowerCase().replace(/ /g, "%20"));
  };

      
  const updateSearchParams = useCallback(
    (name: string, series: string) => {
      setLoader(true)

    // Create a new URLSearchParams object using the current URL search parameters
    const searchParams = new URLSearchParams(window.location.search);
    // Update or delete the 'model' search parameter based on the 'model' value
    if (name) {
      searchParams.set("name", name);
    } else {
      searchParams.delete("name");
    }

    // Update or delete the 'series' search parameter based on the 'series' value
    if (series) {
      searchParams.set("gameSeries", series);
    } else {
        searchParams.delete("gameSeries");
    }

    // // If search params are still the same there's no need to do anything
    // Generate the new pathname with the updated search parameters
    localStorage.setItem('persistentScroll', window.scrollY.toString())//used because when page changes url goes screen top
  

    const newPathname = `${window.location.pathname}?${searchParams.toString()}`;
    router.push(newPathname);
    },
    [searchParams, pathname, router],
  )
      useEffect(() => {
        // Retrieve scrollY value from localStorage after routing
        const persistentScroll = localStorage.getItem('persistentScroll')
        if (persistentScroll === null) return
        // Restore the window's scroll position
        window.scrollTo({ top: Number(persistentScroll) })
        // Remove scrollY from localStorage after restoring the scroll position
        // This hook will run before and after routing happens so this check is
        // here to make we don't delete scrollY before routing
        if (Number(persistentScroll) === window.scrollY)
          localStorage.removeItem('persistentScroll')
      }, [searchParams])
      return (
        <form className="searchbar" onSubmit={handleSearch}>
          <div className="search__item">
            <SearchManufacturer gameSeries={series} setGameSeries={setSeries}/>
            <SearchButton otherClasses="sm:hidden"/>
          </div>
          <div className='searchbar__item'>
            <Image //icon in searchbar
              src='/metroid.svg'
              width={25}
              height={25}
              className='absolute w-[30px] h-[30px] ml-4'
              alt='amiibo name'
            />
            <input
              type='text'
              name='model'
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='Character...'
              className='searchbar__input'
            />
            <SearchButton otherClasses='sm:hidden' />
          </div>
          <SearchButton otherClasses='max-sm:hidden' />
        </form>
      )
}

export default Searchbar