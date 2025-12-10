import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../Context/ContextApi';
import { useContext } from 'react';
function Login() {

  
  const { setIsLoggedIn } = useContext(AppContext)
  const { storeTokenInLocalStorage } = useContext(AppContext)
  const [state , setState] = useState('Sign Up')
  const [username , setUsername] = useState();
  const [email , setEmail] = useState();
  const [password , setPassword] = useState();
  const navigate = useNavigate('')

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      username,
      email,
      password
    }

    if(state === 'Sign Up'){
        fetch('http://localhost:3000/api/auth/signUp', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(formData)
        }).then((response) => {
          response.json().then(data => {
            if(response.ok) {
              // store token in local storege
              storeTokenInLocalStorage(data.token);
              setIsLoggedIn(true)
              navigate('/')
          }
        })
        }).catch(error => {
          console.log(error.message)
        })
    }
    else if(state === 'Login'){
        fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(formData)
        }).then((response) => {
          response.json().then(data => {
            if(response.ok) {
              // store token in local storege
              storeTokenInLocalStorage(data.token);
              setIsLoggedIn(true)
              navigate('/')
          }
          })
        }).catch(error => {
          console.log(error.message)
        })
    }

    setUsername('')
    setEmail('')
    setPassword('')
  }

  return (
    <div className='w-full h-screen flex justify-center items-center poppins-regular'>
        <div className='bg-white grid grid-cols-1 lg:grid-cols-2 shadow-sm shadow-gray-400 rounded-lg h-auto lg:h-[600px] lg:w-[60%] w-[90%] overflow-hidden'>
          {/* FORM CONTAINER */}
          <div className=' w-full rounded-tl-lg rounded-l-lg col-span-1'>

            <div className="flex items-center justify-center  h-full">
              <div className="rounded-md shadow-lg p-8 w-full h-full">
                <h2 className="text-3xl  text-center text-gray-800 mb-0 poppins-bold">{state === 'Sign Up' ? (<span>Create Account</span>) : (<span>Login</span>)}</h2>
                <p className='poppins-light text-[13px] text-center text-violet-800 mb-8'>Create your Account</p>

                  <form onSubmit={ handleSubmit }>
                    {/* Username Field */}
                     {
                      state === 'Sign Up' &&  <div className="mb-8">
                        <div className="flex items-center border px-3 py-3 shadow-md shadow-gray-500 rounded-full">
                          <span className="material-icons text-gray-500 mr-2"></span>
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
                     }
                    

                    {/* Email Field */}
                    <div className="mb-8">
                      <div className="flex items-center border px-3 py-3 shadow-md shadow-gray-500 rounded-full">
                        <span className="material-icons text-gray-500 mr-2"></span>
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
                        <span className="material-icons text-gray-500 mr-2"></span>
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
           {
            state === 'Sign Up' ? (
              <div>
             {/* Already have an account */}
              <p className="text-center text-gray-600 mt-4">
                Already have an account?{' '}
                <span className="text-blue-500 hover:underline cursor-pointer"
                  onClick={() => setState('Login')}
                >
                  Login here
                </span>
              </p>
            </div>
            ) : (
              <div>
            <p className="text-center text-gray-600 mt-4">
                Don't have an account?{' '}
              <span className="text-blue-500 hover:underline cursor-pointer"
                onClick={() => setState('Sign Up')}
              >
                Sign Up
              </span>
            </p>
          </div>
            )
           }
      </div>
    </div>
  </div>
          {/* SHOWCASE CONTAINER */}
          <div className='hidden lg:flex justify-center items-center rounded-tr-lg rounded-r-lg '>
              <img className='h-[100%] bg-contain' src="https://jsmastery.com/_next/image?url=%2Fassets%2Fgeneral%2Fimages%2Fhero-img.webp&w=640&q=75" alt="" />
          </div>

        </div>
    </div>
  )
}

export default Login