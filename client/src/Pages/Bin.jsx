import { useState, useEffect } from "react";
import { HiArchiveBoxArrowDown } from "react-icons/hi2";
import { motion } from "motion/react"
import { clipItems , paintColors } from '../config/StaticData'
import { useRef } from "react";
import { Button } from "../components/ui/button"
import { MdOutlineRestoreFromTrash } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
function Bin() {

  const [binNotes , setBinNotes] = useState([])

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
  const getAllBinNotes = async () => {
    const response = await fetch("http://localhost:3000/api/v1/keep/get-bin-notes");
    const data = await response.json()
    console.log(data);
    setBinNotes(data.message)
  }

  useEffect(() => {
    getAllBinNotes()
  },[])
  
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


  const handleDeleteForeverFromBin = (noteId) => {
    fetch(`http://localhost:3000/api/v1/keep/delete-note-permanent/${noteId}`, {
        method: 'DELETE',
    }).then((response) => response.json)
      .then((data) => console.log(data))
      .catch((error) => {
          toast.error(error.message)
      })
  } 
  const handleRestoreNoteFromBin = (noteId) => {
      fetch(`http://localhost:3000/api/v1/keep/restore-note-from-bin/${noteId}`, {
        method: 'POST',
        headers: {
            "Content-type": "application/json"
        }
    }).then((response) => response.json)
      .then((data) => console.log(data))
      .catch((error) => {
          toast.error(error.message)
      })
  }

  const emptyBin = () => {
      fetch(`http://localhost:3000/api/v1/keep/empty-bin`, {
        method: 'DELETE',
    }).then((response) => response.json)
      .then((data) => console.log(data))
      .then(() => window.location.reload())
      .catch((error) => {
          toast.error(error.message)
      })
  }

  return (
    <div className=' h-svh py-10'>
        <div className="flex gap-2 items-center justify-center">
          <p className="poppins-regular font-medium text-sm">Notes in the Recycle Bin are deleted after 7 days.</p>
          <Button onClick={emptyBin} className="bg-transparent text-sm cursor-pointer poppins-medium text-blue-500 hover:bg-blue-100">Empty Bin</Button>
        </div>
        <div className='py-10 relative w-full h-auto mt-8 flex flex-wrap justify-center items-start gap-8 z-10 pb-10'>
              {/* NOTE CONTAINER */}
          {
              (binNotes.length === 0) ? (<div className='space-y-2'>
                <div className='flex justify-center text-[12rem] text-gray-400'>
                  <HiArchiveBoxArrowDown />
                </div>
                <div>
                  <h1 className='poppins-regular text-2xl text-center text-gray-400'>Your archived notes appear here</h1>
                </div>
              </div>) :
              binNotes?.map((note , index) => (
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


                      <Tooltip>
                        <TooltipTrigger asChild>
                            <span onClick={handleDeleteForeverFromBin(note._id)} className='cursor-pointer text-xl font-bold hover:bg-gray-200 py-2 px-2 bg-neutral-200 text-neutral-900 rounded-sm'><MdDelete /></span>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Delete forever</p>
                        </TooltipContent>
                        </Tooltip>
                        
                        <Tooltip>
                        <TooltipTrigger asChild>
                            <span onClick={handleRestoreNoteFromBin(note._id)} className='cursor-pointer text-xl font-bold hover:bg-gray-200 py-2 px-2 bg-neutral-200 text-neutral-900 rounded-sm'><MdOutlineRestoreFromTrash /></span>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Restore note</p>
                        </TooltipContent>
                    </Tooltip>
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
                      {
                          clipItems.map((item) => (
                              <button className=' cursor-pointer py-1 w-full hover:bg-gray-200 duration-200 text-left px-4' key={item.id}>{item.clipItem}</button>
                          ))
                      }
                      </div>
                  }
                  
                      
              </motion.div>
              ))
          }
        </div>
    </div>
  )
}

export default Bin