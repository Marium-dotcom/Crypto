import Coins from './Components/Coins/Coins.jsx'
import {Routes , Route, BrowserRouter} from 'react-router-dom';
import CoinsDetails from './Components/CoinsDetails/CoinDetails.jsx'
import './App.css';
import Search from './Components/Search/Search.jsx';


function App() {

  return (    

    <BrowserRouter>
    <Routes>

<Route path="/" element={<Coins/>}/>
<Route path="CoinsDetails/:coinid" element={<CoinsDetails/>}/>
<Route path="Search" element={<Search/>}/>

</Routes>
    </BrowserRouter>

  );
}

export default App;
