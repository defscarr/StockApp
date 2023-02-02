import React, { createContext, useContext, useState } from 'react';

const GlobalContext = createContext()

export const AppContext = ({children}) => {



    return (

        <GlobalContext.Provider
            value="hello"
        >
            {children}
        </GlobalContext.Provider>
    )
}

export const UseGlocalContext = () => {
    return useContext(GlobalContext)
}

