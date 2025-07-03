import React, {useEffect, useState } from "react";

function App() {
  const [price, setPrice ] = useState(null)
  useEffect(() => {

    const fetchPrice = () => {
      fetch (`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=demo`)
      //fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=TSLA&apikey=${process.env.REACT_APP_api_key}`)

    //parse það sem json
      .then(res => res.json())
    //finnum verðið
    .then((data) => {
      if (
        !data["Global Quote"] ||
        !data["Global Quote"]["05. price"]
      ) {
        // ef limit eða api ekki að svara
        const errMsg = data.Note || data.Information || "Unknown API error";
        throw new Error(errMsg);
      }
      setPrice(data["Global Quote"]["05. price"]);
    })
    .catch((err) => {
      console.error("API error:", err.message);
    });
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