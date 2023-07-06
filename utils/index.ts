import { amiiboProps, FilterProps } from "@/types";



export const updateSearchParams = (type: string, value: string) => {//update search paremetres
  // Get the current URL search params
  const searchParams = new URLSearchParams(window.location.search);

  // Set the specified search parameter to the given value
  searchParams.set(type, value);

  // Set the specified search parameter to the given value
  const newPathname = `${window.location.pathname}?${searchParams.toString()}`;

  return newPathname;
};

export const deleteSearchParams = (type: string) => {
  // Set the specified search parameter to the given value
  const newSearchParams = new URLSearchParams(window.location.search);

  // Delete the specified search parameter
  newSearchParams.delete(type.toLocaleLowerCase());

  // Construct the updated URL pathname with the deleted search parameter
  const newPathname = `${window.location.pathname}?${newSearchParams.toString()}`;

  return newPathname;
};

export async function fetchAmiibos(filters: FilterProps) {
  const {  amiiboSeries,
    character,
    gameSeries,
    limit,
    name,
    release,
    type,
    image,} = filters;
    
  const headers: HeadersInit = {
    "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY || "",
    "X-RapidAPI-Host": "n3evin-amiiboapi-v1.p.rapidapi.com",
  };
  const response = await fetch(
    `https://n3evin-amiiboapi-v1.p.rapidapi.com/amiibo/?amiiboSeries=${gameSeries}&name=${name}&type=${type}`,
    {
      headers: headers,
    }
  );
  const result = await response.json();//get the data from the api
  return result;
}

