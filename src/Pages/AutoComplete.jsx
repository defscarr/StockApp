import React, { useState, useEffect } from 'react';
import FinnHubApi from '../API/FinnHubApi';
import { UseGlocalContext } from '../Context/GlobalContext';




export const AutoComplete = () => {
    
    const [SearchData, setSearchData] = useState("");
    const [FetchResults, setFetchResults] = useState([]);

    const test = UseGlocalContext()


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
            console.log(test)

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
                            const {description: info, symbol} = stock

                            return (
                                <li className='dropdown-item' key={symbol} onClick={null}>
                                    {info}
                                    ({symbol.split(".")[0]})

                                </li>
                            )
                        })
                    }

                </ul>
            </div>

        </main>
        
    )
}