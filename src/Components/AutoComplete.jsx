import React, { useState, useEffect } from 'react';
import FinnHubApi from '../API/FinnHubApi';
import { UseGlobalContext } from '../Context/GlobalContext';




export const AutoComplete = () => {
    
    const {
        
        SearchData, setSearchData,
        FetchResults, setFetchResults,
        StockList,  setStockList,
        WatchList, setWatchList

        
    } = UseGlobalContext()
    
    const AddNewStock = (symbol) => {

        const CheckDuplicate = WatchList.find( stock => stock === symbol)
        if(CheckDuplicate) return
        symbol.indexOf(".")  === -1 ? setWatchList([...WatchList, symbol]) : null
        setSearchData("")

        
    }



    const ShowOrNot = () => {
        return SearchData ? "show" : null 
    }
    useEffect(() => {
        const GetSearchData = async () => {
            const response = await FinnHubApi.get("/search", {
                params: {
                    q: SearchData
                }
            })
            // setFetchResults(result.data)
            const {result} = response.data
            setFetchResults(result)


        }

        if(SearchData.length > 0)
            GetSearchData()
        else
            setFetchResults([])
        


    }, [SearchData]);

    return (
        <main style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "3rem"
        }}>
            <div className="form-floating dropdown" style={{
                width: "30rem",
                marginTop: "5rem"
            }}>
                <input type="text"
                    className="form-control"
                    id='searchdata'
                    name="search"
                    placeholder="Search"
                    onChange={(e) => setSearchData(e.currentTarget.value)}
                    value={SearchData}

                />
                <label htmlFor="searchdata">Search</label>
                <ul 
                    className={`dropdown-menu ${ShowOrNot()}`}
                    style={{
                        width: "30rem",
                        height: "20rem",
                        overflowY: "scroll",
                        overflowX: "hidden",
                        alignItems: "center"
                    }}
                >
                    {
                        FetchResults.map( stock => {
                            const {description: info, symbol:abbr} = stock
                            return (
                                <li className='dropdown-item' key={abbr} onClick={() => AddNewStock(abbr)}>
                                    {info}
                                    ({abbr})

                                </li>
                            )
                        })
                    }

                </ul>
            </div>

        </main>
        
    )
}