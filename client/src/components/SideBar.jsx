import React, { useContext, useState } from 'react'
import { FaRegLightbulb } from "react-icons/fa6";
import { FiBell } from "react-icons/fi";
import { IoPencil } from "react-icons/io5";
import { HiArchiveBoxArrowDown } from "react-icons/hi2";
import { RiDeleteBin6Line } from "react-icons/ri";

import { IoSettingsOutline } from "react-icons/io5";
import { AppContext } from '../Context/ContextApi';
import { NavLink } from 'react-router-dom'
import { Switch } from "../components/ui/switch"
function SideBar() {
    const { isOpenMenu, setIsOpenMenu } = useContext(AppContext)

  return (
    <div className='grid grid-cols-2'>
            <div className='z-50 bg-white shadow-lg shadow-gray-400 fixed top-[4.1rem] rounded-tr-lg left-0 h-[100%] pr-1'>
                    <div className='block py-2 px-0 group'>
                            <ul className=' list-none space-y-2 px-3'>
                                <NavLink to={'/'}>
                                    <li onClick={() => setIsOpenMenu(false)} className='flex text-sm lg:text-xl font-bold hover:bg-yellow-200 rounded-full px-2 lg:px-3 py-2 lg:py-3 cursor-pointer'>
                                        <span className=''><FaRegLightbulb /></span>
                                        { isOpenMenu && <span className=' px-8  poppins-medium text-[14px]'>Notes</span> }
                                    </li>
                                </NavLink>
                                <NavLink to={'/reminder'}>
                                    <li onClick={() => setIsOpenMenu(false)} className='flex text-sm lg:text-xl  hover:bg-[#14b8a6] rounded-full px-2 lg:px-3 py-2 lg:py-3 cursor-pointer'>
                                        <span className=''><FiBell /></span>
                                        { isOpenMenu && <span className='px-8 poppins-medium text-[14px]'>Reminders</span> }
                                    </li>
                                </NavLink>
                                <NavLink to={'/labels'}>
                                    <li onClick={() => setIsOpenMenu(false)} className='flex text-sm lg:text-xl font-bold hover:bg-[#c4b5fd] rounded-full px-2 lg:px-3 py-2 lg:py-3 cursor-pointer'>
                                        <span className=''><IoPencil /></span>
                                        { isOpenMenu && <span className='px-8 poppins-medium  text-[14px]'>Edit Labels</span> }
                                    </li>
                                </NavLink>
                                <NavLink to={'/archive'}>
                                    <li onClick={() => setIsOpenMenu(false)} className='flex text-sm lg:text-xl font-bold hover:bg-[#d8f999] rounded-full px-2 lg:px-3 py-2 lg:py-3 cursor-pointer'>
                                        <span className=''><HiArchiveBoxArrowDown /></span>
                                        { isOpenMenu && <span className='px-8 poppins-medium  text-[14px]'>Archive</span> }
                                    </li>
                                </NavLink>
                                <NavLink to={'/bin'}>
                                    <li onClick={() => setIsOpenMenu(false)} className='flex text-sm lg:text-xl font-bold hover:bg-[#1d293d] hover:text-white rounded-full px-2 lg:px-3 py-2 lg:py-3 cursor-pointer'>
                                        <span className=''><RiDeleteBin6Line /></span>
                                        { isOpenMenu && <span className='px-8 poppins-medium text-[14px]'>Bin</span> }
                                    </li>
                                </NavLink>
                            </ul>
                    </div>
                    
                    <div className=' absolute bottom-14 left-0 '>
                        <div className='block text-center text-sm lg:text-2xl px-2 lg:px-3 pb-6  space-y-4'>
                            <div>
                                <button className='block py-3 px-3 bg-slate-200 rounded-full cursor-pointer hover:bg-yellow-200'><IoSettingsOutline /></button>
                            </div>
                            <div className=''>
                                <Switch />
                            </div>
                        </div>
                    </div>
                
            </div>
        </div>
  )
}

export default SideBar