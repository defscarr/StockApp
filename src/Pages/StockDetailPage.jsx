import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import FinnHubApi from "../API/FinnHubApi"
import { StockChart } from "../Components/StockChart";



export const StockDetailPage = () => {
    const [StockDetail, setStockDetail] = useState([]);
    const {symbol} = useParams()

    const ParseData = (data) => {
        return data ? data.t.map( (time, index) => {
            return {
                x: time,
                y: data.c[index]
            }
        }) : null


    }

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
                                from: WeekAgo,
                                resolution: 60
                            }
                        }),

                    FinnHubApi.get("/stock/candle", {
                        params: {
                            symbol,
                            to: CurrentTimestamp,
                            from: YearAgo,
                            resolution: "W"
                        }
                    }), 

                    FinnHubApi.get("/stock/candle", {
                        params: {
                            symbol,
                            to: CurrentTimestamp,
                            from: DayAgo,
                            resolution: "D"
                        }
                    })
     
                ]
                )
                
                setStockDetail({

                        day: ParseData(responses[0].data),
                        week: ParseData(responses[1].data),
                        year: ParseData(responses[2].data)
                    })
            } 
            catch (error) {
                console.log(error)

            }

    }
        GetCandleData()

    }, [symbol]);


    return (
        <div>{StockDetail && <StockChart/>}</div>
        )
}

