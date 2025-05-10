import React from 'react'

function Login() {
  return (
    <div className='w-full h-screen flex justify-center items-center'>
        <div className='bg-white grid grid-cols-1 lg:grid-cols-3 shadow-sm shadow-gray-400 rounded-lg h-[600px] w-[60%] overflow-hidden'>
          {/* FORM CONTAINER */}
          <div className=' w-full rounded-tl-lg rounded-l-lg col-span-2'>

          </div>


          {/* SHOWCASE CONTAINER */}
          <div className='hidden lg:flex justify-center items-center rounded-tr-lg rounded-r-lg '>
              <img className='h-[100%] bg-contain' src="https://res.cloudinary.com/prod/image/upload/f_auto,q_auto/registration-and-sign-up/register_free--right-background.png" alt="" />
          </div>

        </div>
    </div>
  )
}

export default Login