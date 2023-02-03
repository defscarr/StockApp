import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import FinnHubApi from "../API/FinnHubApi"



export const StockDetailPage = () => {
    const {symbol} = useParams()


    useEffect(() => {

        const GetCandleData = async () => {
            
            const CurrentTimestamp = Math.floor(new Date().getTime()/1000)

            let DayAgo;

            if(new Date().getDay() === 6) DayAgo = CurrentTimestamp - 2 * (24 * (60*60))
            else if (new Date().getDay() === 0) DayAgo = CurrentTimestamp - 3 * (24 * (60*60)) 
            else DayAgo = CurrentTimestamp - 1 * (24 * (60*60))

            const WeekAgo = CurrentTimestamp - 7 * (24 * (60*60))
            const YearAgo = CurrentTimestamp - 367 * (24 * (60*60))


            try {
                const responses = await Promise.all(
                    [
                    FinnHubApi.get("/stock/candle", {
                        params: {
                            symbol,
                            to: CurrentTimestamp,
                            from: DayAgo,
                            resolution: "D"
                        }
                    })
                ],
                [
                    FinnHubApi.get("/stock/candle", {
                        params: {
                            symbol,
                            to: CurrentTimestamp,
                            from: WeekAgo,
                            resolution: 60
                        }
                    })
                ],
                                    [
                    FinnHubApi.get("/stock/candle", {
                        params: {
                            symbol,
                            to: CurrentTimestamp,
                            from: YearAgo,
                            resolution: "W"
                        }
                    })
                ],               
                )
                console.log(responses)    
            } 
            catch (error) {
                console.log("Axios Error on Promise ::NET DISCONNECTED")

            }

    }
        GetCandleData()

    }, []);


    return (
        <div>StockDetailPage for {symbol}</div>
    )
}

