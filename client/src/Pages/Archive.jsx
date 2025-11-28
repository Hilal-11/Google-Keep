import React from 'react'
import { HiArchiveBoxArrowDown } from "react-icons/hi2";

function Archive() {
  return (
    <div className='flex justify-center items-center h-svh'>
              <div className='space-y-2'>
                <div className='flex justify-center text-[12rem] text-gray-400'>
                  <HiArchiveBoxArrowDown />
                </div>
                <div>
                  <h1 className='poppins-regular text-2xl text-center text-gray-400'>Your archived notes appear here</h1>
                </div>
              </div>
    </div>
  )
}

export default Archive