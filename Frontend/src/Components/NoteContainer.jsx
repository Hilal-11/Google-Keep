import React, { useEffect, useState } from 'react'
import { TfiPaintBucket } from "react-icons/tfi";
import { MdAddAlert } from "react-icons/md";
import { IoPersonAddOutline } from "react-icons/io5";
import { RiGalleryLine } from "react-icons/ri";
import { HiOutlineFolderDownload } from "react-icons/hi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiUndo } from "react-icons/bi";
import { BiRedo } from "react-icons/bi";
import { noNote } from '../assets/noNote.jpg'
import { FaPaintBrush } from "react-icons/fa";
import { LuListTodo } from "react-icons/lu";
import { VscPinned } from "react-icons/vsc";
import { toast } from 'react-toastify';

import { motion } from "motion/react"
import { useRef } from 'react';

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
        if(note.title === '' && note.discription === ''){
            toast.error("Please Provide Title and Note")
        }else{
            listOfNotes.push(note)
        }

        setNoteTitle('')
        setNoteDetails('')
        event.stopPropagation()
        setIsOpenNoteInput(false)
    }


    // FOR NOTE ICONS --> OPTIONS
    const [isPaint , setIsPaint] = useState({});
    const [noteBgColor , setNoteBgColor] = useState({})
    const paintColors = [
        {id: 1 , color: '#14b8a6'},
        {id: 2 , color: '#d8f999'},
        {id: 3 , color: '#1d293d'},
        {id: 4 , color: '#3b82f6'},
        {id: 5 , color: '#fee685'},
        {id: 6 , color: '#fdba74'},
        {id: 7 , color: '#c4b5fd'},

    ];
    const toggleIsPaint = (id) => {
        setIsPaint((prev) => ({
            ...prev,
            [id]: !prev[id]
        }))
    }
 
    const handlePaintColors = (id, color) => {

        setNoteBgColor((prev) => ({
          ...prev,
          [id]: color, // Set the background color for the specific note
        }));
      };

      const [isDraggable , setIsDraggable] = useState(false);
      useEffect(() => {
        const handleResize = () => {
            if(window.innerWidth > 768)
                setIsDraggable(true)
            else
                setIsDraggable(false)
        }
        handleResize();
        window.addEventListener('resize' , handleResize);
        return () => {
            window.removeEventListener('resize' , handleResize)
        }
      }, [])
      const constraintsRef  = useRef(null)

  return (
    <div className='py-5 lg:py-10 px-2 lg:px-6'>

        {/* Search Box */}
        <div className=' bg-white rounded-md w-auto lg:w-1/3 h-auto mx-auto py-3 cursor-text'
            style={{
                'background': 'linear-gradient(145deg, #ffffff, #ffffff)',
                'boxShadow':  '1px 1px 8px #d1d5dc, -1px -1px 8px #d1d5dc',
                
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
        
        <div ref={constraintsRef} className='w-full h-auto mt-8 flex flex-wrap justify-center items-start gap-8 z-10 pb-10'>
            {/* NOTE CONTAINER */}
        {
            listOfNotes.map((item , index) => (
                <motion.div
                    key={index}
                    drag={isDraggable}
                    dragElastic={0.2}
                    dragSnapToOrigin={true}
                    dragConstraints={constraintsRef}
                    dragMomentum={false}
                className='relative'>
                    <div key={index} className='relative w-[290px] lg:w-[300px] h-[400px] ring-1 rounded-lg py-2 px-4 overflow-hidden'
                    style={{
                        'boxShadow':  '2px 2px 12px #d1d5dc, -2px -2px 12px #d1d5dc',
                        backgroundColor: noteBgColor[index] || '#ffffff',
                    }}
                >
                    <div className='flex justify-between items-center'>
                        <h2 className='font-medium text-[18px] poppins-medium text-gray-600'>{item.title}</h2>
                        <span className='text-lg cursor-pointer font-bold hover:bg-gray-200 py-2 px-2 rounded-full'><VscPinned /></span>
                    </div>
                    <div className=' overflow-hidden max-h-[300px] p-1'>
                        <p className='py-2 text-[14px] poppins-regular text-[#4a5565]'>{item.discription}</p>
                    </div>
                    <div className='absolute bottom-1 flex text-gray-700 justify-evenly w-[90%]'>


                        <span className='cursor-pointer font-bold hover:bg-gray-200 py-2 px-2 rounded-full'
                            onClick={() => toggleIsPaint(index)}
                        >
                                <TfiPaintBucket />
                        </span>
                      


                        <span className='cursor-pointer font-bold hover:bg-gray-200 py-2 px-2 rounded-full'><MdAddAlert /></span>
                        <span className='cursor-pointer font-bold hover:bg-gray-200 py-2 px-2 rounded-full'><IoPersonAddOutline /></span>
                        <span className='cursor-pointer font-bold hover:bg-gray-200 py-2 px-2 rounded-full'><RiGalleryLine /></span>
                        <span className='cursor-pointer font-bold hover:bg-gray-200 py-2 px-2 rounded-full'><HiOutlineFolderDownload /></span>
                        <span className='cursor-pointer font-bold hover:bg-gray-200 py-2 px-2 rounded-full'><BsThreeDotsVertical /></span>
                    </div>


                    
                </div>
                {/* PAINTS/COLORS */}
                {
                    isPaint[index] && <div className='py-3 lg:py-0 mt-2 absolute right-[0%] w-auto lg:w-auto px-4 lg:h-[60px] rounded-md shadow-sm shadow-gray-500 flex justify-evenly items-center gap-2 '>
                    {
                        paintColors.map((item) => (
                            <button key={item.id} className='cursor-pointer py-3 lg:py-4 px-3 lg:px-4 rounded-full'
                                style={{
                                    backgroundColor: item.color
                                }}
                                onClick={() => handlePaintColors(index , item.color)}
                            ></button>
                        ))
                    }
                </div>
                }
                    
            </motion.div>


        
                
            ))
        }
        </div>
        <br /><br /> 
    </div>
  )
}

export default NoteContainer