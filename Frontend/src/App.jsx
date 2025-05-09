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
import { useContext } from 'react'
import { AppContext } from './Context/ContextApi'
function App() {

  const { isOpenMenu } = useContext(AppContext)
  return (
    <div>
      <div className=''>
        <ToastContainer />
        <Header />
        {
          isOpenMenu && <div className='block mb-10'>
                          <SideBar />
                        </div> 
        }
        <div className='hidden lg:block mb-10'>
          <SideBar />
        </div> 
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