import React, { useContext } from 'react'
import SideBar from './SideBar'
import NoteContainer from './NoteContainer'
import { AppContext } from '../Context/ContextApi'

function MainBodyNote() {
  const { isOpenMenu , theme , textTheme} = useContext(AppContext)
  return (
    <div className='w-[100%]' 
      style={{
        backgroundColor: theme,
        color: textTheme,
      }}  
    >
    <div className='grid grid-cols-18 gap-1' 
      style={{
        backgroundColor: theme,
        color: textTheme,
      }}  
    >
        {
          isOpenMenu && <div className='block mb-10'>
                          <SideBar />
                        </div> 
        }
        <div className='hidden lg:block mb-10' 
          style={{
            backgroundColor: theme,
            color: textTheme,
          }}  
        >
          <SideBar />
        </div> 
        <div className='absolute left-0 w-screen  mx-auto lg:col-span-16 my-16'
          style={{
            backgroundColor: theme,
            color: textTheme,
          }}  
        >
            <NoteContainer />
        </div>
      </div>
    </div>
  )
}

export default MainBodyNote