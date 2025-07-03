import React, {useEffect, useState } from "react";

function App() {
  const [price, setPrice ] = useState(null)
  useEffect(() => {
    //held þetta sé rétt api
    fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=TSLA&apikey=${process.env.REACT_APP_api_key}`)
    //fetch('https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=TSLA&apikey=demo')


    //parse það sem json
      .then(res => res.json())
    //finnum verðið
      .then(data => {
        console.log("api svar:",data)
        //þeirra api json structure
        const price = data["Global Quote"]["05. price"];
        setPrice(price);
    })
    //obs held það se hamark 5 api calls a minutu
    .catch(err => console.error("error verð", err))
    //runa bara useeffect 1x ekkert refresh reload
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