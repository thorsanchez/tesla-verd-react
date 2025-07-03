import React, {useEffect, useState } from "react";

function App() {
  const [price, setPrice ] = useState(null)
  useEffect(() => {

    const fetchPrice = () => {
      const API_KEY = process.env.REACT_APP_api_key
      //alpha vantage
      //fetch (`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=demo`)
      //fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=TSLA&apikey=${process.env.REACT_APP_api_key}`)
      //finnhub
      fetch(`https://finnhub.io/api/v1/quote?symbol=TSLA&token=${API_KEY}`)

    //parse það sem json
      .then(res => res.json())
    //finnum verðið
    .then((data) => {
      console.log("Finnhub svar:", data);
          if (!data.c) {
            console.warn("Engin verð skilað:", data);
            return;
          }
          setPrice(data.c);
        })
        .catch(err => console.error("Villa við að sækja verð:", err));
    };
    
  //köllum strax a fallið
  fetchPrice()
  //hverjum klukkutima
  const intervalId = setInterval(fetchPrice, 60 * 60 * 1000);

  return () => clearInterval(intervalId);
}, [])
  return(
    <div>
      <h1> Tesla Stock Price</h1>
      {/*birta verð*/}
      {price? <p>${parseFloat(price).toFixed(2)}</p> : <p> Loading</p>}
    </div>
  )
}

export default App;