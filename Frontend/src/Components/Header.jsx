import React, { useContext } from 'react'
import GoogleKeep from '../assets/GoogleKeep.png'
import { IoMenuOutline } from "react-icons/io5";
import { CgMenuGridO } from "react-icons/cg";
import { IoSettingsOutline } from "react-icons/io5";
import { MdRefresh } from "react-icons/md";
import { IoSearchSharp } from "react-icons/io5";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { AppContext } from '../Context/ContextApi';

function Header() {

  const { isOpenMenu, setIsOpenMenu } = useContext(AppContext)
  return (
    <div>
        <div className='bg-white fixed z-50 top-0 left-0 right-0 w-full grid grid-cols-3 justify-between lg:justify-evenly ring-gray-300 ring-1 py-2 lg:px-10'>
            <div className='w-[250px] flex gap-2 items-center'>
                <div className='cursor-pointer px-2 py-2 hover:bg-slate-200 hover:rounded-full'>
                    <span className='text-3xl ' 
                      onClick={() => { setIsOpenMenu(!isOpenMenu) }}  
                    ><IoMenuOutline /></span>
                </div>
                <div className='lg:px-2 flex items-center'>
                    <img className='w-[40px]' src={GoogleKeep} alt="" />
                    <p className='text-xl lg:text-2xl poppins-regular'>Keep</p>
                </div>
            </div>
            <div className=''>
                <input className='hidden lg:flex w-full py-3 px-6 rounded-md bg-slate-200 outline-0' type="text"placeholder='Search Note:- ' />
            </div>

            <div className='flex justify-end items-center lg:pr-10 gap-0 lg:gap-6'>
                    <span className='lg:hidden inline-block text-2xl text-gray-500 cursor-pointer px-[6px] lg:px-2 lg:py-2 hover:bg-slate-200 hover:rounded-full'><IoSearchSharp /></span>
                    <span className='inline-block text-2xl text-gray-500 cursor-pointer px-[6px] lg:px-2 lg:py-2 hover:bg-slate-200 hover:rounded-full'><MdRefresh /></span>
                    <span className='inline-block text-2xl text-gray-500 cursor-pointer px-[6px] lg:px-2 lg:py-2 hover:bg-slate-200 hover:rounded-full'><IoSettingsOutline /></span>
                    <span className='inline-block text-2xl text-gray-500 cursor-pointer px-[6px] lg:px-2 lg:py-2 hover:bg-slate-200 hover:rounded-full'><CgMenuGridO /></span>
                    <Stack direction="row" spacing={2}>
                        <Avatar alt="Remy Sharp" src="https://mui.com/static/images/avatar/2.jpg" />
                    </Stack>
            </div>

        </div>
    </div>
  )
}

export default Header