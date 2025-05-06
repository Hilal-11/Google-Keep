import React from 'react'
import { FaRegLightbulb } from "react-icons/fa6";
import { FiBell } from "react-icons/fi";
import { IoPencil } from "react-icons/io5";
import { HiArchiveBoxArrowDown } from "react-icons/hi2";
import { RiDeleteBin6Line } from "react-icons/ri";
import Switch from '@mui/material/Switch';
import { IoSettingsOutline } from "react-icons/io5";
const label = { inputProps: { 'aria-label': 'Switch demo' } };
function SideBar() {
  return (
    <div className='grid grid-cols-2'>
            <div className='z-50 bg-white shadow-lg shadow-gray-400 fixed top-[4.1rem] rounded-tr-lg left-0 hover:w-[300px] h-[100%] hover:shadow-xl hover:shadow-gray-900 duration-600 pr-1'>
                    <div className='block py-2 px-0 group'>
                            <ul className=' list-none space-y-2 px-3 hover:px-0'>
                                <li className='flex text-sm lg:text-xl font-bold bg-yellow-200 rounded-full hover:rounded-l-[0px] hover:rounded-r-full duration-600 px-2 lg:px-4 py-2 lg:py-4 cursor-pointer'><span className=''><FaRegLightbulb /></span><span className='hidden group-hover:flex  px-8 font-bold text-[14px]'>Notes</span></li>
                                <li className='flex text-sm lg:text-xl font-bold bg-slate-200 rounded-full hover:rounded-l-[0px] hover:rounded-r-full duration-600 px-2 lg:px-4 py-2 lg:py-4 cursor-pointer'><span className=''><FiBell /></span><span className='hidden group-hover:flex px-8 font-bold text-[14px]'>Reminders</span></li>
                                <li className='flex text-sm lg:text-xl font-bold bg-slate-200 rounded-full hover:rounded-l-[0px] hover:rounded-r-full duration-600 px-2 lg:px-4 py-2 lg:py-4 cursor-pointer'><span className=''><IoPencil /></span><span className='hidden group-hover:flex px-8 font-bold text-[14px]'>Edit Labels</span></li>
                                <li className='flex text-sm lg:text-xl font-bold bg-slate-200 rounded-full hover:rounded-l-[0px] hover:rounded-r-full duration-600 px-2 lg:px-4 py-2 lg:py-4 cursor-pointer'><span className=''><HiArchiveBoxArrowDown /></span><span className='hidden group-hover:flex px-8 font-bold text-[14px]'>Archive</span></li>
                                <li className='flex text-sm lg:text-xl font-bold bg-slate-200 rounded-full hover:rounded-l-[0px] hover:rounded-r-full duration-600 px-2 lg:px-4 py-2 lg:py-4 cursor-pointer'><span className=''><RiDeleteBin6Line /></span><span className='hidden group-hover:flex px-8 font-bold text-[14px]'>Bin</span></li>
                            </ul>
                    </div>
                    
                    <div className=' absolute bottom-14 left-0 '>
                        <div className='block text-center text-sm lg:text-2xl px-2 lg:px-4 pb-6  space-y-4'>
                            <div>
                                <button className='block py-3 px-3 bg-slate-200 rounded-full cursor-pointer hover:bg-yellow-200'><IoSettingsOutline /></button>
                            </div>
                            <div className='py-2 lg:py-3 bg-slate-200 rounded-full flex justify-center items-center cursor-pointer hover:bg-yellow-200'>
                                <Switch {...label} defaultChecked size="small" />
                            </div>
                        </div>
                    </div>
                
            </div>
        </div>
  )
}

export default SideBar