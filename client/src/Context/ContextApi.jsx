import React from "react";
import { useState , useEffect, createContext } from "react";


export const AppContext = createContext();
export const AppContextProvider = ({ children }) => {

    const [isOpenMenu , setIsOpenMenu] = useState(true);
    const [isLoggedIn , setIsLoggedIn] = useState(false)

    const storeTokenInLocalStorage = (token) => {
        return localStorage.setItem('token' , token);
    }
    const states = {
        isOpenMenu, setIsOpenMenu,
        isLoggedIn, setIsLoggedIn,
        storeTokenInLocalStorage
    }
    return(
        <AppContext.Provider value={states}>
            { children }
        </AppContext.Provider>
    )
} 

