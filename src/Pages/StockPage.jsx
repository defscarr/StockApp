import { useState, useEffect } from "react"
import FinnHubApi from "../API/FinnHubApi"


export const StockPage = () => {
    
    const [StockList, setStockList] = useState([]);
    const [WatchList, setWatchList] = useState(["GOOGL", "MSFT", "AMZN"]);

    useEffect(() => {

        const IsMounted = true
        const FetchDataFromApi = async () => {
            try {
                const response = await Promise.all(
                    WatchList.map( stock => (
                        FinnHubApi.get("/quote", {
                            params: {
                                symbol: stock
                            }
                        })
                    ))
                    )
                const data = response.map( stock => {
                    return {
                        data: stock.data,
                        symbol: stock.config.params.symbol
                    }
                })

                if(IsMounted)
                    setStockList(data)

            }
            catch( error){
                console.log("Axios Error: ", error)

            }
        }
        
        FetchDataFromApi()
        return () => (IsMounted = false)
    }, []);

    return (
        <div>
            StockListPage
        </div>
    )
}