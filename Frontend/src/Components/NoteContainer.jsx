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
import { VscPinned } from "react-icons/vsc";
function NoteContainer() {

    const [isOpenNoteInput , setIsOpenNoteInput] = useState(false)
    const [noteTitle , setNoteTitle] = useState('');
    const [noteDetails , setNoteDetails] = useState('');

    const [listOfNotes , setListOfNotes] = useState([])
    const handleCreateNote = (event) => {
        const note = {
            title: noteTitle,
            discription: noteDetails,
        }
        listOfNotes.push(note)

        setNoteTitle('')
        setNoteDetails('')
        event.stopPropagation()
        setIsOpenNoteInput(false)
    }

  

  return (
    <div className='py-10 px-6 '>

        {/* Search Box */}
        <div className=' bg-white rounded-md w-auto lg:w-1/3 h-auto mx-auto py-3 cursor-text'
            style={{
                'background': 'linear-gradient(145deg, #ffffff, #ffffff)',
                'boxShadow':  '2px 2px 12px #6e6e6e, -2px -2px 12px #6e6e6e',
                
            }}
        onClick={() => { setIsOpenNoteInput(true) }}
        >
            {
                !isOpenNoteInput && <div className='flex items-center justify-between'><p className='font-medium px-2'>Take a Note</p> 
                    <div className='flex gap-1 lg:gap-7 pr-2 lg:pr-5 text-xl '><span className='cursor-pointer hover:bg-slate-300 rounded-full py-1 px-1'><LuListTodo /></span><span className='cursor-pointer hover:bg-slate-200 rounded-full py-1 px-1'><FaPaintBrush /></span><span className='cursor-pointer hover:bg-slate-300 rounded-full py-1 px-1'><RiGalleryLine /></span></div>
                </div>
            }
        {
            isOpenNoteInput && 
            <div>
                <div>
                    <input
                     className='w-full outline-0 px-5 font-medium py-2 text-black' 
                     type="text" 
                     placeholder='Title:- '
                     onChange={(event) => { setNoteTitle(event.target.value) }}
                     value={noteTitle}
                     />
                </div>
                <div>
                    <textarea 
                        className='resize-auto w-full h-auto outline-0 px-5 font-medium py-0 pt-1 text-black text-[15px]' 
                        placeholder='Take a Note:- ' 
                        onChange={(event) => { setNoteDetails(event.target.value) }}
                        value={noteDetails}
                    >
                    </textarea>
                </div>
                <div className='flex px-3 gap-4 pb-1 flex-wrap'>
                    <span className='cursor-pointer font-bold hover:bg-gray-200 py-2 px-2 rounded-full'><TfiPaintBucket /></span>
                    <span className='cursor-pointer font-bold hover:bg-gray-200 py-2 px-2 rounded-full'><MdAddAlert /></span>
                    <span className='cursor-pointer font-bold hover:bg-gray-200 py-2 px-2 rounded-full'><IoPersonAddOutline /></span>
                    <span className='cursor-pointer font-bold hover:bg-gray-200 py-2 px-2 rounded-full'><RiGalleryLine /></span>
                    <span className='cursor-pointer font-bold hover:bg-gray-200 py-2 px-2 rounded-full'><HiOutlineFolderDownload /></span>
                    <span className='cursor-pointer font-bold hover:bg-gray-200 py-2 px-2 rounded-full'><BsThreeDotsVertical /></span>
                    <span className='cursor-pointer font-bold hover:bg-gray-200 py-2 px-2 rounded-full'><BiUndo /></span>
                    <span className='cursor-pointer font-bold hover:bg-gray-200 py-2 px-2 rounded-full'><BiRedo /></span>


                <div className='flex justify-end gap-2 px-4 font-medium flex-wrap text-[14px]' >
                    <button 
                        className='hover:bg-slate-300 px-3 py-1 rounded-full cursor-pointer'
                        onClick={ handleCreateNote }
                    >Create</button>
                    <button className='hover:bg-slate-300 px-3 py-1 rounded-full cursor-pointer' onClick={(event) => {
                        event.stopPropagation()
                        setIsOpenNoteInput(false)}
                    }>Close</button>
                </div>
                </div>
         </div> 
        }

           
        </div>
        {/* NOTE CONTAINER */}
        <div className='w-full h-[700px] mt-8 flex flex-wrap justify-center items-center gap-8 z-10 pb-10'>
            {/* NOTE CONTAINER */}
        {
            listOfNotes.map((item , index) => (
                <div key={index} className='relative w-[300px] h-[400px] ring-1 rounded-lg py-2 px-4 overflow-hidden'
                    style={{
                        'boxShadow':  '2px 2px 12px #d1d5dc, -2px -2px 12px #d1d5dc',
                    }}
                >
                    <div className='flex justify-between items-center'>
                        <h2 className='font-medium text-[18px] poppins-medium text-gray-600'>{item.title}</h2>
                        <span className='text-lg cursor-pointer font-bold hover:bg-gray-200 py-2 px-2 rounded-full'><VscPinned /></span>
                    </div>
                    <div className=' overflow-hidden max-h-[300px] p-1'>
                        <p className='py-2 text-[14px] poppins-regular text-gray-600'>{item.discription}</p>
                    </div>
                    <div className='absolute bottom-1 flex text-gray-700 justify-evenly w-[90%]'>
                        <span className='cursor-pointer font-bold hover:bg-gray-200 py-2 px-2 rounded-full'><TfiPaintBucket /></span>
                        <span className='cursor-pointer font-bold hover:bg-gray-200 py-2 px-2 rounded-full'><MdAddAlert /></span>
                        <span className='cursor-pointer font-bold hover:bg-gray-200 py-2 px-2 rounded-full'><IoPersonAddOutline /></span>
                        <span className='cursor-pointer font-bold hover:bg-gray-200 py-2 px-2 rounded-full'><RiGalleryLine /></span>
                        <span className='cursor-pointer font-bold hover:bg-gray-200 py-2 px-2 rounded-full'><HiOutlineFolderDownload /></span>
                        <span className='cursor-pointer font-bold hover:bg-gray-200 py-2 px-2 rounded-full'><BsThreeDotsVertical /></span>
                    </div>
                </div>
            ))
        }
        </div>
        <br /><br /> 
    </div>
  )
}

export default NoteContainer