import { useState, useEffect } from "react"
import { Container, Table } from "react-bootstrap";
import FinnHubApi from "../API/FinnHubApi"
import {BsFillCaretDownFill, BsFillCaretUpFill} from "react-icons/bs"



export const StockPage = () => {
    
    const [StockList, setStockList] = useState([]);
    const [WatchList, setWatchList] = useState(["GOOGL", "MSFT", "AMZN"]);

    const WatchArrow = (value) => {
        return value > 0 ? <BsFillCaretUpFill/> : <BsFillCaretDownFill/>
    }
    const DownOrUp = (value) => {
        return value > 0 ? "success": "danger"
    }
    


    useEffect(() => {

        let IsMounted = true
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

                if(IsMounted){
                    
                    setStockList(data)
                }

            }
            catch( error){
                console.log("Axios Error: ::NET DISCONNECTED")

            }
        }
        
        FetchDataFromApi()
        return () => (IsMounted = false)
    }, []);

    return (
        <Container fluid>
            <Table striped hover bordered size="sm" className="mt-5 text-center">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Last</th>
                        <th>Chg</th>
                        <th>Chg%</th>
                        <th>High</th>
                        <th>Low</th>
                        <th>Open</th>
                        <th>Pclose</th>
                    </tr>
                </thead>
                <tbody>
                    {StockList.map( stock => {
                        return (
                            <tr key={stock.symbol}>
                                <th>{stock.symbol}</th>
                                <td className={`text-${DownOrUp(stock.data.c)}`}>{stock.data.c} <span>{WatchArrow(stock.data.c)}</span></td>
                                <td className={`text-${DownOrUp(stock.data.d)}`}>{stock.data.d} <span>{WatchArrow(stock.data.d)}</span></td>
                                <td>{stock.data.dp}</td>
                                <td>{stock.data.h}</td>
                                <td>{stock.data.l}</td>
                                <td>{stock.data.o}</td>
                                <td>{stock.data.pc}</td>
                            </tr>
                        )
                    })}
                </tbody>

            </Table>
        </Container >
    )
}