
import GoogleKeep from '../assets/GoogleKeep.png'
import { IoMenuOutline } from "react-icons/io5";
import { AppContext } from '../Context/ContextApi';
import { MdOutlineSearch } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import * as React from "react"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "./ui/avatar"
import { Button } from "./ui/button"
import { ButtonGroup } from "./ui/button-group"
import {
  InputGroupInput,
} from "./ui/input-group"
import { IoRefresh } from "react-icons/io5";

import { useContext } from 'react';
function Header() {
   const [label, setLabel] = React.useState("personal")
  const { isLoggedIn , setIsLoggedIn } = useContext(AppContext)
  const { isOpenMenu, setIsOpenMenu } = useContext(AppContext)
  const navigate = useNavigate('')

  const logout = () => {
    localStorage.removeItem('token')
    setIsLoggedIn(false)
    navigate('/logout')
  }

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
                 <InputGroupInput placeholder="Search..." className=" w-full rounded-sm h-[45px] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)]" />
                <Button className='hidden cursor-pointer lg:flex justify-center text-center absolute right-3'><MdOutlineSearch/></Button>
            </div>
            <div className='flex justify-end items-center lg:pr-10 gap-0 lg:gap-6 pr-2'>
              <ButtonGroup>
      <ButtonGroup className="hidden sm:flex">
        <Button variant="outline" size="icon" aria-label="Go Back">
          <IoRefresh />
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="outline">Settings</Button>
        <Button variant="outline">View</Button>
      </ButtonGroup>
      <ButtonGroup>
        {
          !isLoggedIn ? (<Button onClick={() => navigate("/login")} variant="outline">Signup</Button>) : (<Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>H</AvatarFallback>
        </Avatar>)
        }
        
        
      </ButtonGroup>
    </ButtonGroup>
            </div>

        </div>
    </div>
  )
}

export default Header

