import React, { useEffect, useState } from 'react';
import BalanceSheet from './components/BalanceSheet';
import axios from './api/axios';

const App = () => {
  const [balanceSheetData, setBalanceSheetData] = useState(null);
  const [error, setError] = useState(null);

  // Fetch balance sheet data on component mount
  const fetchBalanceSheet = async () => {
    try {
      const response = await axios.get('/xero');
      setBalanceSheetData(response.data);
    } catch (err) {
      setError('Failed to fetch balance sheet. Please try again later.');
    }
  };

  // Call fetchBalanceSheet when the component mounts
  useEffect(() => {
    fetchBalanceSheet();
  }, []);

  // Return early if error or loading
  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!balanceSheetData) {
    return <div className="loading">Loading...</div>;
  }

  // Main render when data is available
  return (
    <div className="App">
      <h1>Balance Sheet</h1>
      <BalanceSheet data={balanceSheetData} />
    </div>
  );
};

export default App;
