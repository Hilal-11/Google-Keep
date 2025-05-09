import React from "react";
import { useState , useEffect, createContext } from "react";


export const AppContext = createContext();
export const AppContextProvider = ({ children }) => {

    const [isOpenMenu , setIsOpenMenu] = useState(false);

    const states = {
        isOpenMenu, setIsOpenMenu
    }
    return(
        <AppContext.Provider value={states}>
            { children }
        </AppContext.Provider>
    )
} 

