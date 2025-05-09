import React from 'react'
import Header from './Components/Header'
import MainBodyNote from './Components/MainBodyNote'
import { ToastContainer } from 'react-toastify'
import { Routes , Route } from 'react-router-dom'

import Reminders from './Pages/Reminders'
import Labels from './Pages/Labels'
import Archive from './Pages/Archive'
import Bin from './Pages/Bin'
import SideBar from './Components/SideBar'

function App() {
  return (
    <div>
      <div className=''>
        <ToastContainer />
        <Header />
        <SideBar />
      </div>

    <Routes>
      <Route path='/' element={<MainBodyNote />}/>
      <Route path='/reminder' element={<Reminders />} />
      <Route path='/labels' element={<Labels />} />
      <Route path='/archive' element={<Archive />} />
      <Route path='/bin' element={<Bin />} />
    </Routes>


    </div>
  )
}

export default App