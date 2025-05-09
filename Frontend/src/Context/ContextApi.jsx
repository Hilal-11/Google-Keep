import React from "react";
import { useState , useEffect, createContext } from "react";


export const AppContext = createContext();
export const AppContextProvider = ({ children }) => {

    const [isOpenMenu , setIsOpenMenu] = useState(false);
    const [theme , setTheme] = useState('#18181b')
    const [textTheme , setTextTheme] = useState('#fff')

    // 
    const states = {
        isOpenMenu, setIsOpenMenu,
        theme , setTheme,
        textTheme , setTextTheme
    }
    return(
        <AppContext.Provider value={states}>
            { children }
        </AppContext.Provider>
    )
} 

