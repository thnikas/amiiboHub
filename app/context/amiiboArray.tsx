"use client"
import React, { useState } from 'react';

interface IGlobalContextProps {
  amiiboAr: any;
  setAmiiboAr: (amiiboAr: any) => void;
  limit: number;
  setLimit: (limit: any) => void;
  loader:boolean,
  setLoader:(loader: any) => void;
}

export const GlobalContext = React.createContext<IGlobalContextProps>({//context values that used in the components
  amiiboAr: {},
  setAmiiboAr: () => {},
  limit: 9,
  setLimit: () => {},
  loader:false,
  setLoader:()=>{}
});

export const AmiiboArray = (props:any) => {
  const [amiiboAr, setAmiiboAr] = useState([]);
  const [limit, setLimit]=useState(9)
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