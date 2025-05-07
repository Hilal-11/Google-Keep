import React from 'react'
import Header from './Components/Header'
import MainBodyNote from './Components/MainBodyNote'
import { ToastContainer } from 'react-toastify'
function App() {
  return (
    <div>
      <div className=''>
        <ToastContainer />
        <Header />
        <MainBodyNote />
      </div>
    </div>
  )
}

export default App