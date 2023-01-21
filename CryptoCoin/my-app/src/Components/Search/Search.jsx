import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function Search() {


    const [query, setquery] = useState('')

    async function searchCoin(e){

      
      let q = await  axios.get(`https://api.coingecko.com/api/v3/search?query=${e.target.value}`)

setquery(q.data.coins);


         
    }

    
   

  return (

    <>


    <h1 className="text-center bg-dark text-primary">Coin Search</h1>

    <div  className='w-75 m-auto mt-3 ' >
        <input  placeholder="Search" type="text" 
 className='w-100 m-auto rounded p-2' onChange={(e)=>searchCoin(e)} />
</div>


    <div className="d-flex text-center  justify-content-center">

    <div>{query? query.map((q)=>{return(<>
    <div className="card"><Link to={"/CoinsDetails/"+q.id}>{q.id? q.id : null}</Link> <div> <img  src={q.thumb} alt={q.id} /></div> </div>
   
     </>)}) : null}</div> </div>
</>
  )
}
