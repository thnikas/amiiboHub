import {CustomFilter, Hero, Searchbar,AmiiboCard,ShowMore} from '@/components'
import { fetchAmiibos } from '@/utils'
import { HomeProps } from "@/types";
import { types, yearsOfProduction } from "@/constants";
import Loader from '@/components/Loader';
export default async function Home({ searchParams }: HomeProps) {
  const amiibosFetch = await fetchAmiibos({//get the data from the api
    amiiboSeries: searchParams.amiiboSeries || "",
    character: searchParams.character,
    gameSeries: searchParams.gameSeries || "",
    image:searchParams.image,
    name:searchParams.name||"",
    type:searchParams.type||"Figure",
   
  });
  const amiibos = amiibosFetch.amiibo
  const isDataEmpty = !Array.isArray(amiibos) || amiibos.length < 1 || !amiibos;//check if data exists
  return (
    <main className="overflow-hidden">
     <Hero/>
     <div className='mt-12 padding-x padding-y max-width' id='discover'>
      <div className='home__text-container'>
        <h1 className='text-4xl font-extrabold'>Amiibos catalogue</h1>
        <p>Explore the Amiibos you might like</p>
      </div>
      <div className='home__filters'>
        <Searchbar/>
        <div className='home__filter-container'>
            <CustomFilter title='types' options={types} array={amiibos}/>
            <CustomFilter title='year' options={yearsOfProduction} array={amiibos}/>
        </div>
      </div>
      {!isDataEmpty ? (
        <div >
            {/* the mario animation */}
         <Loader/>
      
                     
        {/* the cards that be showed */}
          <ShowMore
          array={amiibosFetch}
          /> 
        </div>
           
        
        ) : (//if not results so this
          <div className='home__error-container'>
            <h2 className='text-black text-xl font-bold'>Oops, no results</h2>
            <p>{amiibos?.message}</p>
          </div>
        )}
     </div>
    </main>
  )
}
