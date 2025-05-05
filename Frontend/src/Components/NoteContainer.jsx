import React, { useEffect, useState } from 'react'
import { TfiPaintBucket } from "react-icons/tfi";
import { MdAddAlert } from "react-icons/md";
import { IoPersonAddOutline } from "react-icons/io5";
import { RiGalleryLine } from "react-icons/ri";
import { HiOutlineFolderDownload } from "react-icons/hi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiUndo } from "react-icons/bi";
import { BiRedo } from "react-icons/bi";

import { FaPaintBrush } from "react-icons/fa";
import { LuListTodo } from "react-icons/lu";
function NoteContainer() {


    const [isOpenNoteInput , setIsOpenNoteInput] = useState(false)

    
  return (
    <div className='py-10 px-6'>

        {/* Search Box */}
        <div className=' bg-white rounded-md lg:w-1/3 w-full h-auto mx-auto py-3 cursor-text'
            style={{
                'background': 'linear-gradient(145deg, #ffffff, #ffffff)',
                'box-shadow':  '2px 2px 12px #6e6e6e, -2px -2px 12px #6e6e6e',
                
            }}
        onClick={() => { setIsOpenNoteInput(true) }}
        >
            {
                !isOpenNoteInput && <div className='flex items-center justify-between'><p className='font-medium px-2'>Take a Note</p> 
                    <div className='flex gap-7 pr-5 text-xl '><span className='cursor-pointer hover:bg-slate-300 rounded-full py-1 px-1'><LuListTodo /></span><span className='cursor-pointer hover:bg-slate-200 rounded-full py-1 px-1'><FaPaintBrush /></span><span className='cursor-pointer hover:bg-slate-300 rounded-full py-1 px-1'><RiGalleryLine /></span></div>
                </div>
            }
        {
            isOpenNoteInput && 
            <div>
                <div>
                    <input className='w-full outline-0 px-5 font-medium py-2 text-black' type="text" placeholder='Title:- '/>
                </div>
                <div>
                    <textarea className='resize-auto w-full h-auto outline-0 px-5 font-medium py-0 pt-1 text-black text-[15px]' placeholder='Take a Note:- ' ></textarea>
                </div>
                <div className='flex px-3 gap-4 pb-1'>
                    <span className='cursor-pointer font-bold hover:bg-gray-200 py-2 px-2 rounded-full'><TfiPaintBucket /></span>
                    <span className='cursor-pointer font-bold hover:bg-gray-200 py-2 px-2 rounded-full'><MdAddAlert /></span>
                    <span className='cursor-pointer font-bold hover:bg-gray-200 py-2 px-2 rounded-full'><IoPersonAddOutline /></span>
                    <span className='cursor-pointer font-bold hover:bg-gray-200 py-2 px-2 rounded-full'><RiGalleryLine /></span>
                    <span className='cursor-pointer font-bold hover:bg-gray-200 py-2 px-2 rounded-full'><HiOutlineFolderDownload /></span>
                    <span className='cursor-pointer font-bold hover:bg-gray-200 py-2 px-2 rounded-full'><BsThreeDotsVertical /></span>
                    <span className='cursor-pointer font-bold hover:bg-gray-200 py-2 px-2 rounded-full'><BiUndo /></span>
                    <span className='cursor-pointer font-bold hover:bg-gray-200 py-2 px-2 rounded-full'><BiRedo /></span>

                    <div className='flex justify-end gap-4 px-8 font-medium' >
                        <button className='hover:bg-slate-300 px-3 py-1 rounded-full cursor-pointer' onClick={() => { setIsOpenNoteInput(false)}}>Create</button>
                        <button className='hover:bg-slate-300 px-3 py-1 rounded-full cursor-pointer' onClick={() => { setIsOpenNoteInput(false)}}>Close</button>
                    </div>

                </div>

                
         </div>
        }
            
        </div>


    </div>
  )
}

export default NoteContainer