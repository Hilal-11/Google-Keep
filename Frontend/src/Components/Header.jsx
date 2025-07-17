import React, { useContext, useState } from 'react'
import GoogleKeep from '../assets/GoogleKeep.png'
import { IoMenuOutline } from "react-icons/io5";
import { CgMenuGridO } from "react-icons/cg";
import { IoSettingsOutline } from "react-icons/io5";
import { MdRefresh } from "react-icons/md";
import { IoSearchSharp } from "react-icons/io5";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { AppContext } from '../Context/ContextApi';
import avatarImg from '../assets/GoogleKeep.png'
import { MdOutlineSearch } from "react-icons/md";
import { motion } from "motion/react"
import { useNavigate } from 'react-router-dom';
function Header() {
  const [isLoggedIn , setIsLoggedIn] = useContext(AppContext)
  const { isOpenMenu, setIsOpenMenu } = useContext(AppContext)
  const navigate = useNavigate('')
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
            <div className='relative flex items-center justify-center'>
                <input className=' poppins-light text-sm hidden lg:flex w-full py-3 px-4 rounded-md bg-white shadow-sm shadow-gray-500 outline-0' type="text"placeholder='Search Note :- ' />
                <button className='hidden cursor-pointer lg:flex justify-center text-center absolute right-3 text-gray-500 text-xl hover:bg-slate-200 py-2 px-2 rounded-full'><MdOutlineSearch/></button>
            </div>
            <div className='flex justify-end items-center lg:pr-10 gap-0 lg:gap-6 pr-2'>
                    <span className='lg:hidden inline-block text-2xl text-gray-500 cursor-pointer px-[6px] lg:px-2 lg:py-2 hover:bg-slate-200 hover:rounded-full'><IoSearchSharp /></span>
                    <span className='inline-block text-2xl text-gray-500 cursor-pointer px-[6px] lg:px-2 lg:py-2 hover:bg-slate-200 hover:rounded-full'
                      onClick={() => { window.location.reload() }}
                    ><MdRefresh /></span>
                    <span className='hidden lg:inline-block text-2xl text-gray-500 cursor-pointer px-[6px] lg:px-2 lg:py-2 hover:bg-slate-200 hover:rounded-full'><IoSettingsOutline /></span>
            {
              isLoggedIn ? (                    
                <div className='relative group'>
                  <Stack direction="row" spacing={2}>
                          <Avatar className='bg-black cursor-pointer  py-0 px-0' alt="Sabiya Sharp" src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRY2PRnxPr8rX7NOWGRK63y4NGffjANp_V0qXYQ9msj1w0sqj7Zn8PhrI8jwpsmVZn8Lsc&usqp=CAU' />
                          <div className='hidden group-hover:block w-[120px] bg-white z-50 text-[14px] absolute right-0 lg:-left-10 top-14 lg:top-10 py-2 rounded-sm poppins-regular text-center shadow-sm shadow-gray-400'>
                              <button onClick={() => setIsLoggedIn(false)} className='px-2 py-1 whitespace-nowrap cursor-pointer hover:bg-slate-100 w-full'>Logout</button>
                              <button className='px-2 py-1 whitespace-nowrap cursor-pointer hover:bg-slate-100 w-full'>Varify Account</button>
                          </div>
                  </Stack>
                </div>  
              ): (
                  <motion.button
                  initial={{
                    scale: 0.9
                  }}
                  whileHover={{
                    scale: 1
                  }}
                  transition={{
                    ease: 'easeInOut',
                    duration: 0.1
                  }}
                  className='cursor-pointer shadow-sm shadow-gray-400 px-3 py-1 lg:px-5 lg:py-2 rounded-full poppins-regular'
                    onClick={() => navigate('/login')}
                  >
                    Login
                  </motion.button>
                )
            }
            </div>

        </div>
    </div>
  )
}

export default Header