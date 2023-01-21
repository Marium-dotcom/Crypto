import React from 'react'
import './CoinDetails.css'
import { useParams} from 'react-router-dom'
import {useEffect, useState} from 'react'
import DOMPurify from 'dompurify'
import Spinner from 'react-bootstrap/Spinner';

import axios from 'axios'
import Chart from '../Chart/Chart'

export default function CoinDetails() {
    let {coinid} = useParams()
    
    const [details, setdetails] = useState([''])
    const [loading, setloading] = useState(false)


  async function CoinDetails(coinid){
    setloading(true)

    let {data} = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinid}`, details)
    setdetails(data)
    console.log(details)
    setloading(false)

console.log(details.low_24h)
    }


    useEffect(() => {
        
       CoinDetails(coinid)
       console.log(details.low_24h)

    }, []);









  return (

    <div className="mainbody">
      {loading? <div className=" h-100"> <div className= "d-flex justify-content-md-center align-items-center vh-100"> <Spinner  animation="border" variant="primary" /></div> </div>:
<div className="minibody">
  <h1 className="maincard">{details.name} <img className="my-2" src={details.image? details.image.large: ""} alt="" />
</h1>
  

    <div className="maincard">
<div className="txt">

        <p className="text-warning">Rank #{details.market_cap_rank}</p>        
        <p>Current Price: ${details.market_data?.current_price? details.market_data.current_price.usd :'null' }</p>
        <p>Genesis Date: {details.genesis_date?details.genesis_date:'null'}</p>
        <em>Last Updated : {details.last_updated? details.last_updated:"null"}</em>
</div>

    </div>
<div className="maincard">
    <div className="txt">
    <h3 className="text-info mb-3">Daily Changes</h3>

  <p> Price Change 24h: ${details.market_data? details.market_data.price_change_24h: 'null'}</p>
  <p>Price Change Percentage: {details.market_data? details.market_data.price_change_percentage_24h.toFixed(1) :'null'}%</p>
  <p>24H High: ${details.market_data?.high_24h? details.market_data.high_24h.usd : 'null' }</p>
  <p>24H Low: ${details.market_data?.low_24h? details.market_data.low_24h.usd : 'null' }</p>

</div>
</div>

<div className="maincard">
    <div className="txt">
      <h3 className="text-info mb-3">Historical Changes</h3>
 <p>Price Change Percentage in 7 Days: {details.market_data? details.market_data.price_change_percentage_7d.toFixed(1) :'null'}%</p>

 <p>Price Change Percentage in 14 Days: {details.market_data? details.market_data.price_change_percentage_14d.toFixed(1) :'null'}%</p>
 <p>Price Change Percentage in 30 Days: {details.market_data? details.market_data.price_change_percentage_30d.toFixed(1) :'null'}%</p>
 <p>Price Change Percentage in 60 Days: {details.market_data? details.market_data.price_change_percentage_60d.toFixed(1) :'null'}%</p>
 <p>Price Change Percentage in 200 Days: {details.market_data? details.market_data.price_change_percentage_200d.toFixed(1) :'null'}%</p>
 <p>Price Change Percentage in 1 year: {details.market_data? details.market_data.price_change_percentage_1y.toFixed(1) :'null'}%</p>
 <Chart/>

</div>
</div>


    <div className="maincard">
    <h3 className="text-info mb-3">Description</h3>
    <p dangerouslySetInnerHTML={{
      __html:DOMPurify.sanitize(details.description? details.description.en : ""),}}></p>    
    
  </div>


<div className="text-center pb-2 text-danger">Done by coingecko API</div>
</div>}


    </div>
  )
}
