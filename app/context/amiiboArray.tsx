"use client"
import React, { useState, type Dispatch, type PropsWithChildren, type SetStateAction } from 'react';
import { arrayFilter } from '@/types';

interface IGlobalContextProps {
  amiiboAr: arrayFilter[];
  setAmiiboAr: Dispatch<SetStateAction<arrayFilter[]>>;
  limit: number;
  setLimit: Dispatch<SetStateAction<number>>;
  loader:boolean,
  setLoader: Dispatch<SetStateAction<boolean>>;
}

export const GlobalContext = React.createContext<IGlobalContextProps>({//context values that used in the components
  amiiboAr: [],
  setAmiiboAr: () => {},
  limit: 12,
  setLimit: () => {},
  loader:false,
  setLoader:()=>{}
});

export const AmiiboArray = (props: PropsWithChildren) => {
  const [amiiboAr, setAmiiboAr] = useState<arrayFilter[]>([]);
  const [limit, setLimit]=useState(12)
  const [loader, setLoader]=useState(false)
  return (
    <GlobalContext.Provider
      value={{
        amiiboAr:amiiboAr,
        setAmiiboAr:setAmiiboAr,
        limit:limit,
        setLimit:setLimit,
        loader:loader,
        setLoader:setLoader
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
