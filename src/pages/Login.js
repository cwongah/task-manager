import React, { useState } from 'react'
import { useUserAuth } from '../firebase/UserAuthContext'
import { useNavigate } from 'react-router-dom'


function Login({setIsLogin}){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isSignup, setIsSignup] = useState(false)
    // const [error, setError] = useState('')
    const { logIn, signUp } = useUserAuth()
    const navigate = useNavigate()

    async function handleLoginSubmit(e){
        e.preventDefault()
        // setError('')
        try{
            await logIn(email, password)
            setIsLogin(true)
            navigate('/dashboard')
        } catch(err) {
            // setError(err.message)
            alert(err.message)
        }
    }
    
    async function handleSignupSubmit(e){
        e.preventDefault()
        try{
            await signUp(email, password)
            navigate('/dashboard')
        } catch(err){
            alert(err.message)
        }
    }
    
    function handleSignupToggle(){
        setIsSignup(!isSignup)
        setEmail('')
        setPassword('')
    }

    // useEffect(() => {
    //     if(user){
    //         navigate('/dashboard')
    //     }
    // }, [user])

    return(
        <>
            <div className="bg-[url('./background.jpg')] bg-cover bg-center min-h-screen">
                <div className='grid grid-cols-7 gap-8 '>
                    <div className='col-span-4'>
                        <div className='mt-20 ml-20 text-6xl font-extrabold text-white drop-shadow-2xl'>
                            TaskHarmony
                        </div>
                        <div className='mt-16 ml-40 text-xl text-black font-bold drop-shadow-2xl'>
                            Too much going on? Find <span className='underline'>balance</span> in your life.
                        </div>
                    </div>
                    {!isSignup ? 
                        (
                            <div className='col-span-3' >
                                <div className='mt-60'>
                                    <div className='w-full max-w-md bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600  rounded-lg shadow-lg shadow-black p-5 my-10'>
                                        <div className={`${isSignup ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}>
                                            <div className='text-6xl font-bold text-center text-white my-10 drop-shadow-xl'>
                                                Hello!
                                            </div>
                                            <div className='text-xl text-center text-white my-5' >
                                                We are happy to see you again!
                                            </div>
                                            <div className='py-7'>
                                                <form onSubmit={handleLoginSubmit}>
                                                    <div>
                                                        <div className='text-center mb-5'>
                                                            <input 
                                                                type='text'
                                                                placeholder='Email'
                                                                value={email}
                                                                onChange={(e) => setEmail(e.target.value)}
                                                                className='rounded-xl pl-3 shadow-md shadow-black text-2xl'
                                                            />
                                                        </div>
                                                        <div className='text-center'>
                                                            <input 
                                                                type='password'
                                                                placeholder='Password'
                                                                value={password}
                                                                onChange={(e) => setPassword(e.target.value)}
                                                                className='rounded-xl pl-3 shadow-md shadow-black text-2xl'
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className='grid place-content-center my-5'>
                                                        <button type='submit' className='bg-teal-500 shadow-lg shadow-teal-500/50 rounded-lg px-4 py-2 mt-2 text-white text-2xl'>Login</button>
                                                    </div>
                                                </form>
                                                <div className='grid place-content-center text-xs font-bold text-white'>
                                                    <button onClick={handleSignupToggle} className='underline underline-offeset-8'>Don't have an account?</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                        :
                        (
                            <div className='col-span-3' >
                                <div className='mt-60'>
                                    <div className='w-full max-w-md bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600  rounded-lg shadow-lg shadow-black p-5 my-10'>
                                        <div className={`${!isSignup ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}>
                                            <div className='text-6xl font-bold text-center text-white my-10'>
                                                Welcome!
                                            </div>
                                            <div className='text-xl text-center text-white my-5' >
                                                Are you ready to get your life in balance?
                                            </div>
                                            <div className='py-7'>
                                                <form onSubmit={handleSignupSubmit}>
                                                    <div>
                                                        <div className='text-center mb-5'>
                                                            <input 
                                                                type='text'
                                                                placeholder='Email'
                                                                value={email}
                                                                onChange={(e) => setEmail(e.target.value)}
                                                                className='rounded-xl pl-3 shadow-md shadow-black text-2xl'
                                                            />
                                                        </div>
                                                        <div className='text-center'>
                                                            <input 
                                                                type='password'
                                                                placeholder='Password'
                                                                value={password}
                                                                onChange={(e) => setPassword(e.target.value)}
                                                                className='rounded-xl pl-3 shadow-md shadow-black text-2xl'
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className='grid place-content-center my-5'>
                                                        <button type='submit' className='bg-teal-500 shadow-lg shadow-teal-500/50 rounded-lg px-4 py-2 mt-2 text-white text-2xl'>Sign Up</button>
                                                    </div>
                                                </form>
                                                <div className='grid place-content-center text-xs font-bold text-white'>
                                                    <button onClick={handleSignupToggle} className='underline underline-offeset-8'>Already have an account?</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default Login