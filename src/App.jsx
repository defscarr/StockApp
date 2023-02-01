import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AutoComplete } from "./Pages/AutoComplete";
import { StockPage } from "./Pages/StockPage";


export const App = () => {
  return ( 
    <main>
      
      <Router>
        <Routes>
          <Route path='/' element={<StockPage />}></Route>
          <Route path='/details/:symbol' element={<AutoComplete />}></Route>
        </Routes>
      </Router>
        
        
        
    </main>
   )
}
 
