import { MouseEventHandler } from "react";

export interface amiiboProps {//the amiibo type
  amiiboSeries?: string;
  character?: string;
  gameSeries?: string;
  limit?: 10;
  name?: string;
  release?:Release;
  type?:string;
  image:string;
}
type Release = {//the release data in different regions
  au: string,
  eu: string,
  jp:string,
  na:string
}
export interface FilterProps {
  amiiboSeries?: string;
  character?: string;
  gameSeries?: string;
  limit?: 10;
  name?: string;
  release?:Release;
  type?:string;
  image:string;
}

export interface HomeProps {
  searchParams: FilterProps;
}

export interface amiiboamiibodProps {
  amiiboSeries?:string,
  character?:string,
  gameSeries?:string,
  limit?:number,
  name?:string,
  release?:number,
  type?:string,
  image?:string,
}

export interface CustomButtonProps {//which props has the button
  isDisabled?: boolean;
  btnType?: "button" | "submit";
  containerStyles?: string;
  textStyles?: string;
  title: string;
  rightIcon?: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
  handleMouseIn?:MouseEventHandler<HTMLButtonElement>;
  handleMouseOut?:MouseEventHandler<HTMLButtonElement>;
  iconStyles?:string;
}

export interface OptionProps {
  title: string;
  value: string;
}

export interface CustomFilterProps {//custom filter is used in the year and the type
  title: string;
  options: OptionProps[];
}

export interface ShowMoreProps {
  array:any//change
}
export interface arrayFilter {
  amiiboSeries: string,
  character: string,
  gameSeries: string,
  head: string,
  image: string,
  name: string,
  release: {
    au: string,
    eu: string,
    jp: string,
    na: string
  },
  tail: string,
  type: string;

}
export interface SearchManuFacturerProps {
  gameSeries: string;
  setGameSeries: (gameSeries: string) => void;
}
export interface AmiiboDetailsArrayProps {
  name:string,
  des:string
  
}