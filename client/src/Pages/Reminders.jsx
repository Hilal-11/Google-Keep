import React from 'react'
import { FiBell } from "react-icons/fi";
function Reminders() {
  return (
    <div className='flex justify-center items-center h-svh'>
      <div className='space-y-2'>
        <div className='flex justify-center text-[12rem] text-gray-400'>
          <FiBell />
        </div>
        <div>
          <h1 className='poppins-regular text-2xl text-center text-gray-400'>Notes with upcoming reminders appear here</h1>
        </div>
      </div>
    </div>
  )
}

export default Reminders