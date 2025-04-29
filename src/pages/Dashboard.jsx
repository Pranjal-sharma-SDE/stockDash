import { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../components/Loader';
import StockChart from '../components/StockChart';
import localData from '../data/initialStocks.json';

const API_KEY = import.meta.env.VITE_ALPHAVANTAGE_API_KEY;
const INITIAL_SYMBOLS = ['AAPL', 'GOOGL', 'MSFT', 'TSLA', 'AMZN'];
const QUICK_SYMBOLS = ['NFLX', 'NVDA', 'META', 'INTC', 'AMD'];

export default function Dashboard() {
  const [stocks, setStocks] = useState([]);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('symbol');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCharts, setShowCharts] = useState(false);

  useEffect(() => {
    async function fetchInitialData() {
      setLoading(true);
      try {
        const results = await Promise.all(
          INITIAL_SYMBOLS.map(symbol =>
            axios.get('https://www.alphavantage.co/query', {
              params: {
                function: 'GLOBAL_QUOTE',
                symbol,
                apikey: API_KEY
              }
            })
          )
        );

        const stockData = results.map(res => {
          const data = res.data['Global Quote'];
          return {
            symbol: data['01. symbol'],
            price: parseFloat(data['05. price']),
            change: parseFloat(data['10. change percent']),
          };
        });

        setStocks(stockData);
        setError('');
      } catch (err) {
        console.error("API error, loading local data", err);
        setStocks(localData);
        setError('Loaded local stock data due to API error.');
      }
      setLoading(false);
    }

    fetchInitialData();
  }, []);

  const filteredStocks = stocks
    .filter(s => s.symbol.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) =>
      sortBy === 'symbol'
        ? a.symbol.localeCompare(b.symbol)
        : b.price - a.price
    );

  const handleAddSymbol = async (symbol) => {
    if (!symbol) return;
    setLoading(true);
    try {
      const res = await axios.get('https://www.alphavantage.co/query', {
        params: {
          function: 'GLOBAL_QUOTE',
          symbol,
          apikey: API_KEY
        }
      });

      const data = res.data['Global Quote'];
      if (!data || !data['05. price']) {
        setError(`${symbol} is not a valid symbol or API limit reached.`);
        setLoading(false);
        return;
      }

      const stock = {
        symbol: data['01. symbol'],
        price: parseFloat(data['05. price']),
        change: parseFloat(data['10. change percent']),
      };

      setStocks(prev => [...prev.filter(s => s.symbol !== stock.symbol), stock]);
      setError('');
    } catch (err) {
      console.error(err);
      setError(`Could not fetch ${symbol} data.`);
    }
    setLoading(false);
  };

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold mb-4 text-center"> Stock Price Dashboard</h2>
      <p className="text-center text-gray-600 mb-6">Track and visualize stock trends in real-time or offline fallback mode.</p>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
        <input
          type="text"
          placeholder="Search or add symbol (e.g., IBM)"
          className="px-4 py-2 border rounded w-full sm:w-1/3"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button
          onClick={() => handleAddSymbol(search.toUpperCase())}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add Stock
        </button>
        <select
          onChange={e => setSortBy(e.target.value)}
          className="px-4 py-2 border rounded"
        >
          <option value="symbol">Sort by Symbol</option>
          <option value="price">Sort by Price</option>
        </select>
        <button
          onClick={() => setShowCharts(!showCharts)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {showCharts ? 'Hide Charts' : 'Show Charts'}
        </button>
      </div>

      {/* Quick Add Buttons */}
      <div className="flex flex-wrap gap-2 mb-4">
        {QUICK_SYMBOLS.map(sym => (
          <button
            key={sym}
            onClick={() => handleAddSymbol(sym)}
            className="bg-gray-200 hover:bg-blue-300 text-sm px-3 py-1 rounded"
          >
            {sym}
          </button>
        ))}
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 font-semibold mb-2">{error}</p>}

      {/* Table */}
      {loading ? (
        <Loader />
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 text-left">Symbol</th>
                <th className="p-2 text-left">Price ($)</th>
                <th className="p-2 text-left">Change %</th>
                {showCharts && <th className="p-2 text-left">Chart</th>}
              </tr>
            </thead>
            <tbody>
              {filteredStocks.map((stock, i) => (
                <tr key={i} className="border-t hover:bg-gray-50">
                  <td className="p-2 font-medium">{stock.symbol}</td>
                  <td className="p-2">{stock.price.toFixed(2)}</td>
                  <td className={`p-2 ${stock.change > 0 ? 'text-green-600' : 'text-red-500'}`}>
                    {stock.change.toFixed(2)}%
                  </td>
                  {showCharts && (
                    <td className="p-2 w-[200px]">
                      <StockChart symbol={stock.symbol} />
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}