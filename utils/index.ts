import { FilterProps } from "@/types";



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
  const { gameSeries, name, type } = filters;

  const searchParams = new URLSearchParams();

  if (gameSeries) searchParams.set("amiiboSeries", gameSeries);
  if (name) searchParams.set("name", name);
  if (type) searchParams.set("type", type);

  const filtersQuery = searchParams.toString();
  const query = `${filtersQuery}${filtersQuery ? "&" : ""}showusage`;

  const response = await fetch(
    `https://www.amiiboapi.org/api/amiibo/?${query}`,
    { next: { revalidate: 3600 } }
  );

  if (!response.ok) {
    throw new Error(`AmiiboAPI request failed with status ${response.status}`);
  }

  const contentType = response.headers.get("content-type");

  if (!contentType?.includes("application/json")) {
    throw new Error("AmiiboAPI returned an unexpected response format");
  }

  return response.json();//get the data from the api
}

