import React from 'react'
import { GoArrowRight } from "react-icons/go";
import { useNavigate } from 'react-router-dom';
function Logout() {
    const navigate = useNavigate()
  return (
    <div className='w-full h-screen flex justify-center items-center bg-slate-200'>
        <div>
            <div>
                <h1 className='poppins-bold text-6xl text-center'>Welcome to the Google Keep</h1>
            </div>
            <div className=' flex justify-center py-10'>
                <button
                    onClick={() => navigate('/login')}
                className='flex justify-center items-center gap-4 px-28 py-4 rounded-full shadow-md shadow-gray-800 poppins-regular cursor-pointer '>Get Start <span className='text-2xl'><GoArrowRight /></span></button>
            </div>
        </div>
    </div>
  )
}

export default Logout