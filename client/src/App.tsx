import Header from './components/Header'
import MainBodyNote from './components/MainBodyNote'
import { ToastContainer } from 'react-toastify'
import { Routes , Route , useLocation } from 'react-router-dom'

import Reminders from './Pages/Reminders.js'
import Labels from './Pages/Labels.js'
import Archive from './Pages/Archive.js'
import Bin from './Pages/Bin.js'
import SideBar from './components/SideBar'
import { useContext } from 'react'
import { AppContext } from './Context/ContextApi'
import Login from './auth/Login.js'
import Logout from './auth/Logout.js'
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