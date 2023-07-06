import { useContext } from 'react';

import { GlobalContext } from './amiiboArray';
export const useGlobalContext = () => useContext(GlobalContext);
