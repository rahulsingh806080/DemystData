import React, { useEffect, useState } from "react";
import BalanceSheet from "./components/BalanceSheet";
import axios from "./api/axios";
const App = () => {
    const [balanceSheetData, setBalanceSheetData] = useState(
        null
    );
    const [error, setError] = useState(null);
    useEffect(() => {
        fetchBalanceSheet();
    }, []);

    const fetchBalanceSheet = async () => {
        try {
           // const response = await fetch(baseUrl);
            axios.get("/xero").then((response)=>{
                setBalanceSheetData(response.data);
              })
            // if (!response.ok) {
            //     throw new Error("Failed to fetch balance sheet");
            // }
            // const data = await response.json();
            // setBalanceSheetData(data);
        } catch (err) {
            setError("Failed to fetch balance sheet. Please try again later.");
            console.error(err);
        }
    };
    if (error) {
        return <div className="error">{error}</div>;
    }

    if (!balanceSheetData) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="App">
            <h1>Balance Sheet</h1>
            <BalanceSheet data={balanceSheetData}/>
        </div>
    );
};

export default App;
