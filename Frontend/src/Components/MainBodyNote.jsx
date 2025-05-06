import React from 'react'
import SideBar from './SideBar'
import NoteContainer from './NoteContainer'
function MainBodyNote() {
  return (
    <div className='w-[100%]'>


    <div className='grid grid-cols-18 gap-1'>
        <div className='mb-10'>
            <SideBar />
        </div> 
        <div className='lg:w-[100%] w-[100%] relative -right-6 mx-auto col-span-16 my-16'>
            <NoteContainer />
        </div>
      </div>
    </div>
  )
}

export default MainBodyNote