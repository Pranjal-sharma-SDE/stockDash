import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 via-white to-gray-200 p-6">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-4 text-center">
         Welcome to the Stock Price Dashboard (By Pranjal Sharma)
      </h1>

      <p className="text-lg text-gray-600 text-center mb-6 max-w-xl">
        Track real-time stock prices, compare changes, and visualize trends with dynamic charts.
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-wrap gap-4 justify-center">
        <button
          onClick={() => navigate('/dashboard')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md transition"
        >
          Go to Dashboard
        </button>
        <a
          href="https://www.alphavantage.co"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-3 rounded-lg shadow-md transition"
        >
          Learn about the API
        </a>
      </div>

      {/* Simple Graph-like SVG Visualization */}
      <div className="mt-12 w-full max-w-md">
        {/* <img src="https://cdn3d.iconscout.com/3d/premium/thumb/stock-market-chart-3d-icon-download-in-png-blend-fbx-gltf-file-formats--analytics-logo-candlestick-share-trader-ui-pack-user-interface-icons-7190822.png?f=webp" class ="w-full h-full object-cover" alt="Stock Chart" />   */}
      
        <svg viewBox="0 0 400 100" className="w-full h-32 text-blue-500">
          <polyline
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            points="0,60 50,40 100,45 150,30 200,50 250,20 300,60 350,40 400,70"
            className="animate-pulse"
          />
        </svg>
        <p className="text-center text-sm text-gray-500 mt-2">Real-time chart visualizations await you!</p>
      </div>
    </div>
  );
}
