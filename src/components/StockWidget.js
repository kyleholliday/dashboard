import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';

const StockWidget = () => {
  const [stocks, setStocks] = useState([]);
  const [error, setError] = useState(null);

  const apiKey = 'I83X9TNDU0M2EP9Y';
  const symbols = useMemo(() => ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA'], []); // Example stock symbols

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const stockPromises = symbols.map((symbol) =>
          axios.get(
            `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`
          )
        );

        const stockResponses = await Promise.all(stockPromises);
        console.log('Stock Responses:', stockResponses);

        const stockData = stockResponses.map(
          // (response) => response.data['Global Quote']
          (response) => {
            console.log('Full Response Data:', response.data);
            return response.data['Global Quote'] || {};
          }
        );
        console.log('Parsed Stock Data:', stockData);

        const validStockData = stockData.filter(
          (stock) => stock && Object.keys(stock).length
        );

        setStocks(validStockData);
        setError(null);
      } catch (error) {
        setError('Failed to fetch stock data. Please try again later.');
        console.error('Error:', error);
      }
    };

    fetchStockData();
  }, [apiKey, symbols]);

  return (
    <div className="stock-widget bg-white rounded-xl shadow-xl py-6 px-6 mx-auto">
      {error ? (
        <p>{error}</p>
      ) : stocks.length ? (
        <div>
          <h1 className="pb-2 text-lg font-semibold">Stocks of the Day</h1>
          <ul className="pt-2">
            {stocks.map((stock, index) => {
              const symbol = stock['01. symbol'];
              const price = parseFloat(stock['05. price']);
              const change = parseFloat(stock['09. change']);
              const changePercent = stock['10. change percent'];

              return (
                <li key={index} className="mb-4 flex items-center">
                  <p className="text-md font-medium w-1/3">{symbol}</p>
                  <p
                    className={`w-1/3 ${
                      change > 0 ? 'text-green-500' : 'text-red-500'
                    }`}
                  >
                    {price} USD
                  </p>
                  <p
                    className={`w-1/3 ${
                      change > 0 ? 'text-green-500' : 'text-red-500'
                    }`}
                  >
                    {change > 0 ? '↑' : '↓'} {changePercent}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <p>Loading stocks...</p>
      )}
    </div>
  );
};

export default StockWidget;
