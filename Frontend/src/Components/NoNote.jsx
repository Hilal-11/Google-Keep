import React from 'react'
import noNote  from '../assets/noNote.jpg'

function NoNote() {
  return (
    <div className='flex-col justify-center items-center py-10'>
        <div>
            <h1 className='text-center text-gray-400 text-xl lg:text-3xl poppins-light'>Notes that you add appear here</h1>
        </div>
        <div className='flex justify-center'>
            <img className='w-auto lg:w-[500px] ' src={noNote} alt="" />
        </div>
    </div>
  )
}

export default NoNote