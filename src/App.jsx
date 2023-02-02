import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AutoComplete } from "./Components/AutoComplete";
import { StockOverviewPage } from './Pages/StockOverviewPage';


export const App = () => {
  return ( 
    <main>
      
      <Router>
        <AutoComplete />
        <Routes>
          <Route path='/' element={<StockOverviewPage />}></Route>
          <Route path='/details/:symbol' element={null}></Route>
        </Routes>
      </Router>
        
        
        
    </main>
   )
}
 
