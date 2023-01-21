import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import moment from 'moment'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';

  import { Line } from 'react-chartjs-2'

  
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );


  

export default function Chart() {
    const {coinid} = useParams()

const [ax, setAx] = useState([])



    useEffect(() => {
      async function getData(){
    
        let res = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinid}/market_chart?vs_currency=usd&days=30`)
        const {prices} = res.data
        console.log(prices);
        let mapChar =  prices.map(prices => ({x: prices[0] , y: prices[1].toFixed()}))

        setAx(mapChar)
       
    }

    
    getData()
    }, [coinid])
    
    
      let date = ax.map((e) => moment(e.x).format('MMMM Do YYYY'))
      console.log(date);

      
      const options = {

        responsive: true,
        plugins: {
            legend: {
              position: 'top' ,
            },
        title: {
            display: true,
            text: `${coinid.toUpperCase()}'S Price change in the previous 30 days`,
          }
       
     }
     }
     const labels = date


     const data = {
        labels,
        datasets: [{
            label: coinid,
            data: ax.map(price => price.y),
            borderColor: 'rgb(13,202,226)',
            backgroundColor: 'rgb(13,202,226)',
      
           

        }]
     }

     return(<>
     <div className="w-75 m-auto">
     <Line options={options} data={data}/>
</div>
     </>)

    

    








   
}

