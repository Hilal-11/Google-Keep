import noNote  from '../assets/noNote.png'
import girl from '../assets/girl.png'
import boy from '../assets/boy.jpg'

function NoNote() {
  return (
    <div className='flex-col justify-center items-center py-10'>
        <div>
            <h1 className='text-center text-gray-400 text-xl lg:text-3xl poppins-light'>Notes that you add appear here</h1>
        </div>
        <div className='flex justify-center items-end'>
            <img className='relative left-28 hidden lg:block grayscale-75 h-[200px] w-auto' src={boy} alt="" />
            <img className='w-auto lg:w-[500px] grayscale-50' src={noNote} alt="" />
            <img className='relative right-28 hidden lg:block grayscale-75 h-[200px] w-auto' src={girl} alt="" />
        </div>
    </div>
  )
}

export default NoNote