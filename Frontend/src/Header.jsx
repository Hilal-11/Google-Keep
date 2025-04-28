import React from 'react'
import GoogleKeep from './assets/GoogleKeep.png'
import { IoMenuOutline } from "react-icons/io5";
function Header() {
  return (
    <div>
        <div className='ring-1 ring-gray-500 flex px-4 py-1 items-center gap-0'>
            <div className='w-[250px] flex gap-2 items-center'>
                <div className='cursor-pointer px-2 py-2 hover:bg-slate-200 hover:rounded-full'>
                    <span className='text-3xl '><IoMenuOutline /></span>
                </div>
                <div className='px-2 flex items-center'>
                    <img src={GoogleKeep} alt="" />
                    <p className='text-2xl font-bold'>Keep</p>
                </div>
            </div>
            <div>
                <input className='px-4 py-3 rounded-md w-[800px] bg-slate-200' type="text" placeholder='Search'/>
            </div>
            <div>

            </div>
        </div>
    </div>
  )
}

export default Header