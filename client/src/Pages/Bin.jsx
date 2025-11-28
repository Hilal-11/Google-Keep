import React from 'react'
import { RiDeleteBin6Line } from "react-icons/ri";

function Bin() {
  return (
    <div className='flex justify-center items-center h-svh'>
          <div className='space-y-2'>
            <div className='flex justify-center text-[12rem] text-gray-400'>
              <RiDeleteBin6Line />
            </div>
            <div>
              <h1 className='poppins-regular text-2xl text-center text-gray-400'>No notes in Recycle Bin</h1>
            </div>
          </div>
    </div>
  )
}

export default Bin