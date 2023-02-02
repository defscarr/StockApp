import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AutoComplete } from "./Components/AutoComplete";
import { StockOverviewPage } from './Pages/StockOverviewPage';
import { StockDetailPage } from './Pages/StockDetailPage';



export const App = () => {
  return ( 
    <main>
      
      <Router>
        <Routes>
          <Route path='/' element={<StockOverviewPage />}></Route>
          <Route path='/detail/:symbol' element={<StockDetailPage/>}></Route>
        </Routes>
      </Router>
        
        
        
    </main>
   )
}
 
