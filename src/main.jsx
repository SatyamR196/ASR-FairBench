import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import App from './App.jsx'
import { BrowserRouter as Router } from "react-router-dom";
import { DataProvider } from './DataContext';

createRoot(document.getElementById('root')).render(
  <Router>
    <DataProvider>
      <StrictMode>
        <App />
      </StrictMode>
    </DataProvider>
  </Router>
)
