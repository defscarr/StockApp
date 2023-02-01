import axios from "axios";

const API_KEY = "cfcjj39r01qs3nqkqjagcfcjj39r01qs3nqkqjb0"

export default axios.create({

    baseURL: "https://finnhub.io/api/v1",
    params: {
        token: API_KEY
    }
    
})
