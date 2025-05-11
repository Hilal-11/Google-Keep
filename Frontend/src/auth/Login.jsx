import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
function Login() {

  const [state , setState] = useState('Sign Up')
  const [username , setUsername] = useState();
  const [email , setEmail] = useState();
  const [password , setPassword] = useState();
  const navigate = useNavigate('')

  return (
    <div className='w-full h-screen flex justify-center items-center'>
        <div className='bg-white grid grid-cols-1 lg:grid-cols-3 shadow-sm shadow-gray-400 rounded-lg h-[600px] w-[60%] overflow-hidden'>
          {/* FORM CONTAINER */}
          <div className=' w-full rounded-tl-lg rounded-l-lg col-span-2'>
            <div className="flex items-center justify-center">
              <div className="rounded-md shadow-lg p-8 w-full max-w-md">
                <h2 className="text-3xl  text-center text-gray-800 mb-0 poppins-bold">{state === 'Sign Up' ? (<span>Create Account</span>) : (<span>Login</span>)}</h2>
                <p className='poppins-light text-[13px] text-center text-violet-800 mb-8'>Create your Account</p>

                  <form >
                    {/* Username Field */}
                      <div className="mb-8">
                        <div className="flex items-center border px-3 py-3 shadow-md shadow-gray-500 rounded-full">
                          <span className="material-icons text-gray-500 mr-2">person</span>
                          <input
                            type="text"
                            placeholder="Username"
                            className="w-full outline-none text-gray-700"
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                            required
                          />
                        </div>
                      </div>
                    

                    {/* Email Field */}
                    <div className="mb-8">
                      <div className="flex items-center border px-3 py-3 shadow-md shadow-gray-500 rounded-full">
                        <span className="material-icons text-gray-500 mr-2">email</span>
                        <input
                          type="email"
                          placeholder="Email"
                          className="w-full outline-none text-gray-700"
                          onChange={(e) => setEmail(e.target.value)}
                          value={email}
                          required
                        />
                      </div>
                    </div>

                    {/* Password Field */}
                    <div className="mb-8">
                      <div className="flex items-center border px-3 py-3 shadow-md shadow-gray-500 rounded-full">
                        <span className="material-icons text-gray-500 mr-2">lock</span>
                        <input
                          type="password"
                          placeholder="Password"
                          className="w-full outline-none text-gray-700"
                          onChange={(e) => setPassword(e.target.value)}
                          value={password}
                          required
                        />
                      </div>
                    </div>


                    <p className='mb-4 text-indigo-500 cursor-pointer'>Forgot Password</p>

                    {/* Sign Up Button */}
                    <button
                      type="submit"
                      className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
                    >
                      { state }
                    </button>
                  </form>

        
           <div>
             {/* Already have an account */}
              <p className="text-center text-gray-600 mt-4">
                Already have an account?{' '}
                <span className="text-blue-500 hover:underline cursor-pointer"
                >
                  Login here
                </span>
              </p>
            </div>
          <div>
            <p className="text-center text-gray-600 mt-4">
                Don't have an account?{' '}
              <span className="text-blue-500 hover:underline cursor-pointer"
                  >
                Sign Up
              </span>
            </p>
          </div>


      </div>
    </div>
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