import { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip);

const API_KEY = import.meta.env.VITE_ALPHAVANTAGE_API_KEY;

export default function StockChart({ symbol }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchChartData() {
      try {
        const res = await axios.get('https://www.alphavantage.co/query', {
          params: {
            function: 'TIME_SERIES_INTRADAY',
            symbol,
            interval: '60min',
            apikey: API_KEY,
          },
        });

        const timeSeries = res.data['Time Series (60min)'];
        if (!timeSeries) return;

        const labels = Object.keys(timeSeries).slice(0, 6).reverse();
        const prices = labels.map(l => parseFloat(timeSeries[l]['4. close']));

        setData({
          labels,
          datasets: [{
            label: `${symbol} Price`,
            data: prices,
            fill: false,
            borderColor: '#3b82f6',
            tension: 0.1
          }]
        });
      } catch (e) {
        console.error('Chart error:', e);
      }
    }

    fetchChartData();
  }, [symbol]);

  if (!data) return <span className="text-sm text-gray-400">Loading...</span>;

  return <Line data={data} height={100} />;
}
