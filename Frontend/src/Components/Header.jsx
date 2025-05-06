import React from 'react'
import GoogleKeep from '../assets/GoogleKeep.png'
import { IoMenuOutline } from "react-icons/io5";
import reactUserIcon from '../assets/react.svg'
import { CgMenuGridO } from "react-icons/cg";
import { IoSettingsOutline } from "react-icons/io5";
import { MdRefresh } from "react-icons/md";

import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

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
                <div>
                    <Stack direction="row" spacing={2}>
                        <Avatar alt="Remy Sharp" src="https://mui.com/static/images/avatar/2.jpg" />
                    </Stack>
                </div>
            </div>

        </div>
    </div>
  )
}

export default Header