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
import { BsPin } from "react-icons/bs";
import { BsPinFill } from "react-icons/bs";
import { toast } from 'react-toastify';
import { motion } from "motion/react"
import { useRef } from 'react';
import NoNote from './NoNote';
import { clipItems , paintColors } from '../config/StaticData'
import { Button } from "@/components/ui/button"

function NoteContainer() {

    const [isOpenNoteInput , setIsOpenNoteInput] = useState(false)
    const [noteTitle , setNoteTitle] = useState('');
    const [noteDetails , setNoteDetails] = useState('');
    const [isPinnedTrue , setIsPinnedTrue] = useState(false)
    const [listOfNotes , setListOfNotes] = useState("")
    
    const getAllNotes = async () => {
        const response = await fetch('http://localhost:3000/api/v1/keep/get-notes')
        const data = await response.json()
        console.log(data)
        setListOfNotes(data.message)
    }


        // get all created notes
    useEffect(() => {
        getAllNotes();
    }, [])




    const handleCreateNote = (event) => {
        const note = {
            note_title: noteTitle,
            note_discription: noteDetails,
        }
        console.log(note)
        if(note.title === '' && note.discription === ''){
            toast.error("Please Provide Title and Note")
        }

        fetch('http://localhost:3000/api/v1/keep/create-note' , {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(note)
        }).then(res => {
            console.log(res)
            if(res.ok) {
                getAllNotes();
            }
        }).catch(error => {
            toast.error(error.message)
        }) 


        setNoteTitle('')
        setNoteDetails('')
        event.stopPropagation()
        setIsOpenNoteInput(false)
    }

        // delete note
    const handleDeleteNote =  (noteId) => {
            fetch(`http://localhost:3000/api/v1/delete-note/${noteId}`, {
                method: "DELETE",
                headers: {
                            "Content-type": "application/json"
                }
                }).then((res) => {
                    console.log(res)
                    if(res.ok) {
                        getAllNotes();
                    }
                }).catch((error) => {
                    toast.error(error.message)
                })
    }
    const handleNoteLabels = (noteId) => {
       console.log("Hey this is G-Keep", noteId)
    }
    const handleNoteDrawing = (noteId) => {
       console.log("Hey this is G-Keep", noteId)
    }
    const handleNoteCopy = (noteId) => {
       console.log("Hey this is G-Keep", noteId)
    }
    const handleNoteStick = (noteId) => {
       console.log("Hey this is G-Keep", noteId)
    }
    const handleNoteDocs = (noteId) => {
       console.log("Hey this is G-Keep", noteId)
    }
    const handleNoteHistory = (noteId) => {
       console.log("Hey this is G-Keep", noteId)
    }

    const [uploadFile , setUploadFile] = useState(null)
    const handleImageUpload = (event) => {
        console.log(event.target.files)
        if(event.target.files && event.target.files.length > 0){
            setUploadFile(event.target.files[0])
        }


        // upload to backend 

        fetch("http://localhost:3000/api/v1/keep/upload-media", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(uploadFile)
        }).then((response) => {
            console.log(response)
        }).catch((error) => {
            toast.error(error.message)
        })
    }
    


    // FOR NOTE ICONS --> OPTIONS
    const [isPaint , setIsPaint] = useState({});
    const [noteBgColor , setNoteBgColor] = useState({})
    const [isClipItem , setIsClipItems] = useState({})

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

    const toggleClipItems = (id) => {
        setIsClipItems((prev) => ({
            ...prev , 
            [id] : !prev[id]
        }))
    }
    const [isExpanded , setIsExpanded] = useState(false)
    const expandNode = (id) => {
        setIsExpanded((prev) => ({
            ...prev,
            [id]: !prev[id]
        }))
    }
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
    <div className='py-5 lg:py-7 px-2 lg:px-6'>

        {/* Search Box */}
        <div className=' bg-white rounded-md w-auto lg:w-4xl h-auto mx-auto py-3 cursor-text'
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
                        onInput={(event) => {
                            event.target.style.height = 'auto'; // Reset height to auto to calculate new height
                            event.target.style.height = `${event.target.scrollHeight}px`; // Set height based on content
                        }}
                        className='resize-none w-full h-auto outline-0 px-5 font-medium py-0 pt-1 text-black text-[15px]' 
                        placeholder='Take a Note:- ' 
                        onChange={(event) => { setNoteDetails(event.target.value) }}
                        value={noteDetails}
                    >
                    </textarea>
                </div>
                <div className='flex px-3 gap-4 pb-1 flex-wrap      '>
                    <Button className='bg-neutral-200 text-neutral-900 cursor-pointer hover:bg-neutral-300'><TfiPaintBucket /></Button>
                    <Button className='bg-neutral-200 text-neutral-900 cursor-pointer hover:bg-neutral-300'><MdAddAlert /></Button>
                    <Button className='bg-neutral-200 text-neutral-900 cursor-pointer hover:bg-neutral-300'><IoPersonAddOutline /></Button>
                    <Button className='bg-neutral-200 text-neutral-900 cursor-pointer hover:bg-neutral-300'><RiGalleryLine /></Button>
                    <Button className='bg-neutral-200 text-neutral-900 cursor-pointer hover:bg-neutral-300'><HiOutlineFolderDownload /></Button>
                    <Button className='bg-neutral-200 text-neutral-900 cursor-pointer hover:bg-neutral-300'><BsThreeDotsVertical /></Button>
                    <Button className='bg-neutral-200 text-neutral-900 cursor-pointer hover:bg-neutral-300'><BiUndo /></Button>
                    <Button className='bg-neutral-200 text-neutral-900 cursor-pointer hover:bg-neutral-300'><BiRedo /></Button>
                    
                <div className='flex justify-end gap-2 font-medium flex-wrap text-[14px]' >
                    <Button 
                        className='hover:bg-neutral-800 cursor-pointer'
                        onClick={ handleCreateNote }
                    >Create</Button>
                    <Button className='hover:bg-neutral-800 cursor-pointer' onClick={(event) => {
                        event.stopPropagation()
                        setIsOpenNoteInput(false)}
                    }>Close</Button>
                </div>
                </div>
         </div> 
        }

           
        </div>
        {/* NOTE CONTAINER */}
        
        <div ref={constraintsRef} className='relative w-full h-auto mt-8 flex flex-wrap justify-center items-start gap-8 z-10 pb-10'>
            {/* NOTE CONTAINER */}
        {
            (listOfNotes.length === 0) ? (<NoNote />) :
            listOfNotes?.map((note , index) => (
                <motion.div
                    key={index}
                    // drag={isDraggable}
                    // dragElastic={0.2}
                    // dragSnapToOrigin={true}
                    // dragConstraints={constraintsRef}
                    // dragMomentum={false}
                className='relative'>
                    <div key={index} className={isExpanded[index] ? 'space-y-6 relative mx-auto lg:w-[300px] h-auto ring-1 rounded-lg py-2 px-4' : 'relative w-[100%] lg:w-[300px] h-[400px] ring-1 rounded-lg py-2 px-4 overflow-hidden'}
                    style={{
                        'boxShadow':  '2px 2px 12px #d1d5dc, -2px -2px 12px #d1d5dc',
                        backgroundColor: noteBgColor[index] || '#ffffff',
                    }}
                >
                    <div className='flex justify-between items-center'>
                        <h2 className='font-medium text-[18px] poppins-medium text-gray-600'>{note.note_title}</h2>
                        <span className='text-lg cursor-pointer font-bold hover:bg-gray-200 py-2 px-2 rounded-full' onClick={() => setIsPinnedTrue(!isPinnedTrue)}>{ isPinnedTrue ? (<BsPinFill/>) : (<BsPin />)}</span>
                    </div>
                    <div 
                        onClick={() => expandNode(index)}
                        className={isExpanded[index] ? 'w-full h-auto ' : ' overflow-hidden max-h-[300px] p-1'}>
                        <p className='py-2 text-[14px] poppins-regular text-[#4a5565]'>{note.note_discription}</p>
                    </div>
                    <div className='grid grid-cols-1 gap-1 py-2 px-2 w-full h-auto'>
                        {note.note_mediaFile?.map((image , index) => (
                            <img key={index} src={image} alt="error" />
                        ))}
                    </div>
                    <div className='absolute bottom-0 left-0 flex text-gray-700 justify-evenly bg-neutral-100 w-full py-1.5 shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)]'>
                        <span className='cursor-pointer font-bold hover:bg-gray-200 py-2 px-2 rounded-full'
                            onClick={() => toggleIsPaint(index)}
                        >
                                <TfiPaintBucket />
                        </span>
                        <span className='cursor-pointer font-bold hover:bg-gray-200 py-2 px-2 rounded-full'><MdAddAlert /></span>
                        <span className='cursor-pointer font-bold hover:bg-gray-200 py-2 px-2 rounded-full'><IoPersonAddOutline /></span>
                        <input type="file" onChange={handleImageUpload} id="fileUpload" className='hidden'/>
                            <span className='cursor-pointer font-bold hover:bg-gray-200 py-2 px-2 rounded-full'><label htmlFor="fileUpload"><RiGalleryLine /></label></span>
                        <span className='cursor-pointer font-bold hover:bg-gray-200 py-2 px-2 rounded-full'><HiOutlineFolderDownload /></span>
                        <span 
                        onClick={() => toggleClipItems(index)}
                        className='cursor-pointer font-bold hover:bg-gray-200 py-2 px-2 rounded-full'>
                            <BsThreeDotsVertical />
                        </span>
                    </div>  
                </div>
                {/* PAINTS/COLORS */}
                {
                    isPaint[index] && <div className='z-50 bg-white py-3 lg:py-0 mt-2 absolute right-[0%] w-auto lg:w-auto px-4 lg:h-[60px] rounded-md shadow-sm shadow-gray-500 flex justify-evenly items-center gap-2 '>
                    {
                        paintColors.map((item) => (
                            <button key={item.id} className='cursor-pointer py-3 lg:py-4 px-3 lg:px-4 rounded-full'
                                style={{
                                    backgroundColor: item.color
                                }}
                                onClick={() => handlePaintColors(index , item.note_color)}
                            ></button>
                        ))
                    }
                </div>
                }
                {
                    isClipItem[index] && <div className='z-50 absolute left-[35%] lg:left-[70%] py-2 my-1 w-[170px] h-auto rounded-md bg-white shadow-md shadow-gray-300 flex-col poppins-regular text-[13px]'>
                    {/* {
                        clipItems.map((item) => (
                            <button key={item.id} onClick={handleAction(item.type, note.id)}  className=' cursor-pointer py-1 w-full hover:bg-gray-200 duration-200 text-left px-4'></button>
                        ))
                    } */}
                    <button onClick={handleDeleteNote(note.id)} className=' cursor-pointer py-1 w-full hover:bg-gray-200 duration-200 text-left px-4'>Delete note</button>
                    <button onClick={handleNoteLabels(note.id)} className=' cursor-pointer py-1 w-full hover:bg-gray-200 duration-200 text-left px-4'>Add Label</button>
                    <button onClick={handleNoteDrawing(note.id)} className=' cursor-pointer py-1 w-full hover:bg-gray-200 duration-200 text-left px-4'>Add drawing</button>
                    <button onClick={handleNoteCopy(note.id)} className=' cursor-pointer py-1 w-full hover:bg-gray-200 duration-200 text-left px-4'>Make a copy</button>
                    <button onClick={handleNoteStick(note.id)} className=' cursor-pointer py-1 w-full hover:bg-gray-200 duration-200 text-left px-4'>Show stick boxes</button>
                    <button onClick={handleNoteDocs(note.id)} className=' cursor-pointer py-1 w-full hover:bg-gray-200 duration-200 text-left px-4'>Copy to Google Docs</button>
                    <button onClick={handleNoteHistory(note.id)} className='cursor-pointer py-1 w-full hover:bg-gray-200 duration-200 text-left px-4'>Version history</button>
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







