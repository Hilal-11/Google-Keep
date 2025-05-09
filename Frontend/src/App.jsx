import React from 'react'
import Header from './Components/Header'
import MainBodyNote from './Components/MainBodyNote'
import { ToastContainer } from 'react-toastify'
import { Routes , Route } from 'react-router-dom'

import Reminders from './Pages/Reminders'
import Archive from './Pages/Archive'
import Bin from './Pages/Bin'

function App() {
  return (
    <div>
      <div className=''>
        <ToastContainer />
        <Header />
        <MainBodyNote />
      </div>

    <Routes>
      <Route path='/reminder' element={<Reminders />} />
      <Route path='/archive' element={<Archive />} />
      <Route path='/bin' element={<Bin />} />
    </Routes>


    </div>
  )
}

export default App