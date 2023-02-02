import React from 'react'
import ReactDOM from 'react-dom/client'
import {App} from './App'
import { AppContext } from './Context/GlobalContext'
import './App.css'
import 'bootstrap/dist/css/bootstrap.css'





ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppContext>
      <App />
    </AppContext>
  </React.StrictMode>
)
