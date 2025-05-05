import React from 'react'
import GoogleKeep from './assets/GoogleKeep.png'
import { IoMenuOutline } from "react-icons/io5";
import reactUserIcon from './assets/react.svg'
import { CgMenuGridO } from "react-icons/cg";
import { IoSettingsOutline } from "react-icons/io5";
import { MdRefresh } from "react-icons/md";

import { FaRegLightbulb } from "react-icons/fa6";
import { FiBell } from "react-icons/fi";
import { IoPencil } from "react-icons/io5";
import { HiArchiveBoxArrowDown } from "react-icons/hi2";
import { RiDeleteBin6Line } from "react-icons/ri";
function Header() {
  return (
    <div>
        <div className='w-full grid grid-cols-3 justify-evenly ring-1 border-gray-400 py-2 px-10'>
            <div className='w-[250px] flex gap-2 items-center'>
                <div className='cursor-pointer px-2 py-2 hover:bg-slate-200 hover:rounded-full'>
                    <span className='text-3xl '><IoMenuOutline /></span>
                </div>
                <div className='px-2 flex items-center'>
                    <img src={GoogleKeep} alt="" />
                    <p className='text-2xl font-bold'>Keep</p>
                </div>
            </div>
            <div className=''>
                <input className='w-full py-3 px-6 rounded-md bg-slate-200 outline-0' type="text"placeholder='Search Note:- ' />
            </div>

            <div className='flex justify-end pr-10 items-center gap-6'>
                <div>
                    <span className='inline-block text-2xl text-gray-500 cursor-pointer px-2 py-2 hover:bg-slate-200 hover:rounded-full'><MdRefresh /></span>
                </div>
                <div>
                    <span className='inline-block text-2xl text-gray-500 cursor-pointer px-2 py-2 hover:bg-slate-200 hover:rounded-full'><IoSettingsOutline /></span>
                </div>
                <div>
                    <span className='inline-block text-2xl text-gray-500 cursor-pointer px-2 py-2 hover:bg-slate-200 hover:rounded-full'><CgMenuGridO /></span>
                </div>
                <div className='w-12 h-12 rounded-full shadow-inner shadow-gray-500 flex justify-center items-center'>
                    <img src={reactUserIcon} alt="" />
                </div>
            </div>

            <div className='fixed top-[4.1rem] rounded-tr-lg left-0 hover:w-[300px] h-[100%] hover:shadow-xl hover:shadow-gray-900 duration-600 pr-1'>
                <div className='block py-2 px-0 '>
                        <ul className=' list-none space-y-2 px-3 hover:px-0'>
                            <li className='text-xl font-bold block bg-yellow-200 rounded-full hover:rounded-l-[0px] hover:rounded-r-full duration-600 px-4 py-4 cursor-pointer'><span className=''><FaRegLightbulb /></span></li>
                            <li className='text-xl font-bold block bg-slate-200 rounded-full hover:rounded-l-[0px] hover:rounded-r-full duration-600 px-4 py-4 cursor-pointer'><span className=''><FiBell /></span></li>
                            <li className='text-xl font-bold block bg-slate-200 rounded-full hover:rounded-l-[0px] hover:rounded-r-full duration-600 px-4 py-4 cursor-pointer'><span className=''><IoPencil /></span></li>
                            <li className='text-xl font-bold block bg-slate-200 rounded-full hover:rounded-l-[0px] hover:rounded-r-full duration-600 px-4 py-4 cursor-pointer'><span className=''><HiArchiveBoxArrowDown /></span></li>
                            <li className='text-xl font-bold block bg-slate-200 rounded-full hover:rounded-l-[0px] hover:rounded-r-full duration-600 px-4 py-4 cursor-pointer'><span className=''><RiDeleteBin6Line /></span></li>
                        </ul>
                    </div>
                </div>
        </div>
    </div>
  )
}

export default Header