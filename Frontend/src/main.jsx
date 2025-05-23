import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter , Routes , Route } from 'react-router-dom'
import { AppContextProvider } from './Context/ContextApi.jsx'
createRoot(document.getElementById('root')).render(

  <BrowserRouter>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </BrowserRouter>,
)


