# 📈 Stock Price Dashboard

A dynamic web dashboard built with React.js that allows users to:

- View real-time stock prices
- Add new stock symbols
- Sort and search stocks
- Visualize price trends using mini line charts
- Use fallback local data when the API limit is exceeded
 

## 🌐 Live Demo

👉 [Visit the Dashboard]( https://stockdashbypj.netlify.app)  


---
** Home Page **
![Home Page](https://res.cloudinary.com/dqhyudo4x/image/upload/v1745935321/WhatsApp_Image_2025-04-29_at_19.08.41_fe09edfc_tjknck.jpg)

** Dashboard Page **
![Dashboard Page](https://res.cloudinary.com/dqhyudo4x/image/upload/v1745935289/WhatsApp_Image_2025-04-29_at_19.01.33_ef00932a_g6ynhh.jpg)


## 🚀 Features

- 🔍 **Search and Add Symbols:** Quickly filter or add new stock symbols
- 📊 **Sort by Symbol or Price**
- ⚡ **Mini Charts for Each Stock:** Toggleable trend graphs
- 🧠 **Quick Add Buttons:** Add popular stocks instantly
- 💾 **Offline Fallback:** Uses local data if the API quota is exceeded

---

## 📦 Tech Stack

- **Frontend:** React + TailwindCSS
- **API:** [Alpha Vantage](https://www.alphavantage.co/)
- **Visualization:** Chart.js (via custom `StockChart` component)
- **Others:** Axios for API calls, Local JSON fallback

---

## 🛠️ Installation

1. **Clone the repository**

```bash
git clone https://github.com/Pranjal-sharma-SDE/stockDash.git
cd stock-dashboard
```

2. **Install dependencies**

```bash
npm install
```

3. **Create a `.env` file**

```env
VITE_ALPHAVANTAGE_API_KEY=your_api_key_here
```

> 🔑 You can get a free API key from [https://www.alphavantage.co/support/#api-key](https://www.alphavantage.co/support/#api-key)

4. **Run the app locally**

```bash
npm run dev
```

---

## 📁 Project Structure

```bash
src/
├── components/
│   ├── Loader.jsx
│   └── StockChart.jsx
├── data/
│   └── initialStocks.json     # Local fallback data
├── pages/
│   └── Dashboard.jsx 
│   └── Home.jsx              # Main dashboard logic
├── App.jsx
├── main.jsx
└── index.css
```

---

## 📂 Fallback Data File

Create a local fallback file at: `src/data/initialStocks.json`

```json
[
  {
    "symbol": "AAPL",
    "price": 170.45,
    "change": 0.87
  },
  {
    "symbol": "GOOGL",
    "price": 125.10,
    "change": 1.12
  },
  {
    "symbol": "MSFT",
    "price": 295.32,
    "change": -0.42
  },
  {
    "symbol": "TSLA",
    "price": 245.55,
    "change": 2.15
  },
  {
    "symbol": "AMZN",
    "price": 118.75,
    "change": -0.90
  }
]
```

---



---

## ☁️ Deployment

To deploy your app:

###  **Netlify**

- Link your GitHub repo
- Add `VITE_ALPHAVANTAGE_API_KEY` in Netlify environment variables
- Set build command to `npm run build`
- Set publish directory to `dist`



## 🧠 Future Features

- 📈 Full-screen stock chart modal
- 🔁 Auto-refresh stock prices
- 🌙 Dark mode toggle
- 💾 Persistent favorites using localStorage

---

## 🙌 Credits

- API: [Alpha Vantage](https://www.alphavantage.co/)
- Charts: [Chart.js](https://www.chartjs.org/)
- Icons & UI: TailwindCSS

---

## 📃 License

MIT License — Free to use and modify.

---

## 💬 Feedback

Have suggestions? Found a bug?  
Open an [issue]