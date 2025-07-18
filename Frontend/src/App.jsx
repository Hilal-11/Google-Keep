import React from 'react'
import Header from './Components/Header'
import MainBodyNote from './Components/MainBodyNote'
import { ToastContainer } from 'react-toastify'
import { Routes , Route , useLocation } from 'react-router-dom'

import Reminders from './Pages/Reminders'
import Labels from './Pages/Labels'
import Archive from './Pages/Archive'
import Bin from './Pages/Bin'
import SideBar from './Components/SideBar'
import { useContext } from 'react'
import { AppContext } from './Context/ContextApi'
import Login from './auth/Login'
import Logout from './auth/Logout'
function App() {

  const { isOpenMenu } = useContext(AppContext)
  const location = useLocation()
  const noHeaderSidebarRoutes = ['/login', '/logout']
  const shouldShowHeaderSidebar = !noHeaderSidebarRoutes.includes(location.pathname)

  return (
    <div>
      {
        shouldShowHeaderSidebar && (
        <div className=''>
          <ToastContainer />
          <Header />
        {
          isOpenMenu &&
          <div className='block mb-10'>
            <SideBar />
          </div> 
        }
        <div className='hidden lg:block mb-10'>
          <SideBar />
          </div> 
        </div>
        )
      }
        <Routes>
          <Route path='/' element={<MainBodyNote />}/>
          <Route path='/reminder' element={<Reminders />} />
          <Route path='/labels' element={<Labels />} />
          <Route path='/archive' element={<Archive />} />
          <Route path='/bin' element={<Bin />} />
          <Route path='/login' element={<Login />} />
          <Route path='/logout' element={<Logout />} />
        </Routes>
    </div>

          

  )
}

export default App