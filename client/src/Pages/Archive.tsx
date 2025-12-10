import { useState, useEffect } from "react";
import { HiArchiveBoxArrowDown } from "react-icons/hi2";
import { TfiPaintBucket } from "react-icons/tfi";
import { MdAddAlert } from "react-icons/md";
import { IoPersonAddOutline } from "react-icons/io5";
import { RiGalleryLine } from "react-icons/ri";
import { HiOutlineFolderDownload } from "react-icons/hi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { motion } from "motion/react"
import { clipItems , paintColors } from '../config/StaticData'
import { useRef } from "react";
function Archive() {

  const [archivedNotes , setArchiedNotes] = useState([])

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
  const getAllArchivedNotes = async () => {
    const response = await fetch("http://localhost:3000/api/v1/keep/get-archive-notes");
    const data = await response.json()
    console.log(data);
    setArchiedNotes(data.message)
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

  useEffect(() => {
    getAllArchivedNotes();
  }, [])

  return (
    <div className='flex justify-center items-center h-svh'>
              
        <div ref={constraintsRef} className='relative w-full h-auto mt-8 flex flex-wrap justify-center items-start gap-8 z-10 pb-10'>
              {/* NOTE CONTAINER */}
          {
              (archivedNotes.length === 0) ? (<div className='space-y-2'>
                <div className='flex justify-center text-[12rem] text-gray-400'>
                  <HiArchiveBoxArrowDown />
                </div>
                <div>
                  <h1 className='poppins-regular text-2xl text-center text-gray-400'>Your archived notes appear here</h1>
                </div>
              </div>) :
              archivedNotes?.map((note , index) => (
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

export default Archive