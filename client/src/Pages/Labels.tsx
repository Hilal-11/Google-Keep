import { IoPencil } from "react-icons/io5";

function Labels() {
  return (
    <div className='flex justify-center items-center h-svh'>
        <div className='space-y-2'>
          <div className='flex justify-center text-[12rem] text-gray-400'>
            <IoPencil />
          </div>
          <div>
            <h1 className='poppins-regular text-2xl text-center text-gray-400'>No Note Labels are added</h1>
          </div>
        </div>
    </div>
  )
}

export default Labels