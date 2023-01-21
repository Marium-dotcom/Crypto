import React from 'react'
import axios from 'axios'
import './Coins.css'
import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner';





export default function Coins() {



    let coinpges = new Array(10).fill(1).map((e,i) =>i+1)

    const [coin, setCoin] = useState([''])
    const [loading, setloading] = useState(false)




    async function getCoins(pge){
        setloading(true)
        let {data} = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=${pge}&sparkline=false`, coin)
        setCoin(data)
        console.log(data)
    setloading(false)
    }
    

    useEffect(() => {
      
    getCoins(1)
      
    }, [])
    


  return (

    <>
      
    

    
    <div className="bg-dark">
    <h1 className="text-center  text-primary">Top #100 Cryptocurrency
</h1>
<div className="w-25 m-auto">
    <button className='w-100 '><Link to="Search">Search here for all</Link></button>
</div>
    {loading? <div className=" h-100"> <div className= "d-flex justify-content-md-center align-items-center vh-100"> <Spinner  animation="border" variant="primary" /></div> </div>
      
 :
    <div className="main">
    <div className="mini table-responsive">
    <table className="table ">
        
                <thead>
                    <tr>
                    <th>click on logo for info</th>
                    <th>Coin</th>
                    <th>Price</th>
                    <th>24</th>
                    <th>Volume</th>
                    <th>Mkt Cap</th>
                    </tr>
                    </thead>

                    
                    

           <tbody>
         
    {
        coin.map((e,key)=>{
            return (
                <>
                    <tr key={key}>    
                        <td><Link to={"/CoinsDetails/"+e.id}><img src={e.image}  alt={e.id} /></Link></td> 
                        <td className="text-white">{e.symbol}</td>
                        <td>{e.current_price}</td>
                        <td>{e.high_24h}</td>
                        <td>{e.total_volume}</td>
                        <td>${e.market_cap}</td>
                        </tr>

                </>
            )
        })
    }
                    </tbody>

</table>
</div>

</div> }

<nav aria-label="...">
<ul className="pagination pagination-sm d-flex justify-content-center text-primary">


{
    coinpges.map((pge)=> <li onClick={()=>getCoins(pge)} className="page-item disabled ">
    <span className="page-link mt-4 text-primary">{pge}</span>
  </li>)
}
</ul>
</nav>
<div className="text-center pb-2  text-danger">Done by coingecko API</div>

</div>

    </>
    
  )
}
