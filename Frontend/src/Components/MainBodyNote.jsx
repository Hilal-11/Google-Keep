import React from 'react'
import SideBar from './SideBar'

function MainBodyNote() {
  return (
    <div className='w-[100%]'>


    <div className='grid grid-cols-18 gap-1'>
        <div className=''>
            <SideBar />
        </div>
        <div className=' h-[600px] col-span-17'>
            
        </div>
    </div>



    </div>
  )
}

export default MainBodyNote