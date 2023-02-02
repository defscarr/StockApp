import React, { createContext, useContext, useState } from 'react';

const GlobalContext = createContext()

export const AppContext = ({children}) => {

// Stock Watchlist  state - StockPage.jsx
    const [WatchList, setWatchList] = useState(["GOOGL", "MSFT", "AMZN", "AA"]);
    const [StockList, setStockList] = useState([]);


// Autocomplete state - AutoComplete.jsx
    const [SearchData, setSearchData] = useState("");
    const [FetchResults, setFetchResults] = useState([]);


    return (

        <GlobalContext.Provider
            value={{

                WatchList, setWatchList,
                StockList, setStockList,
                SearchData, setSearchData,
                FetchResults, setFetchResults,


            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}

export const UseGlobalContext = () => {
    return useContext(GlobalContext)
}

