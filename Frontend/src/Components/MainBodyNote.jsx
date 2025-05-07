import React, { useContext } from 'react'
import SideBar from './SideBar'
import NoteContainer from './NoteContainer'
import { AppContext } from '../Context/ContextApi'

function MainBodyNote() {
  const { isOpenMenu } = useContext(AppContext)
  return (
    <div className='w-[100%]'>
    <div className='grid grid-cols-18 gap-1'>
        {
          isOpenMenu && <div className='block mb-10'>
                          <SideBar />
                        </div> 
        }
        <div className='hidden lg:block mb-10'>
          <SideBar />
        </div> 
        <div className='w-screen  mx-auto lg:col-span-16 my-16'>
            <NoteContainer />
        </div>
      </div>
    </div>
  )
}

export default MainBodyNote