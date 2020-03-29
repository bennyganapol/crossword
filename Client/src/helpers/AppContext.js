import { createContext } from 'react';


const isMobileDevice = () => {
  return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
};

export const InitialAppContext = {
  isMobileDevice: isMobileDevice()
};

export const AppContext = createContext(InitialAppContext);
export default AppContext;
