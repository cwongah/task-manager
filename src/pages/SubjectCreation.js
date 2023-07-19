import React, { useState } from "react";
import { useUserAuth } from "../firebase/UserAuthContext";
import { addSubject } from "../firebase/firestore";
import { useNavigate } from "react-router-dom";
import { FaWindowClose } from 'react-icons/fa'

function SubjectCreation({setScPop}){
    const { user } = useUserAuth()
    const [title, setTitle] = useState('')
    const navigate = useNavigate()

    function handleSubmit(e){
        e.preventDefault()
        if(title === ''){
            alert("No title provided!")
            return
        }
        setScPop(false)
        addSubject(user.uid, title)
        navigate('/dashboard')
    }

    return(
        <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex justify-center items-center">
            <div className="h-1/5 w-1/4 bg-white bg-opacity-30 rounded-lg p-6 max-w-6xl">
                <div className="text-white text-3xl font-bold border-b border-white mb-12 pb-1 flex justify-between items-center">
                    <div>
                        New Collection?
                    </div>
                    <div>
                        <button 
                            onClick={()=>setScPop(false)}
                            className="mr-1"
                        >
                            <FaWindowClose size={25}/>
                        </button>
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className='grid grid-cols-4 gap-4 px-3'>
                        <div className='col-span-3'>
                            <input
                                type="text"
                                placeholder="Collection Title"
                                value={title}
                                onChange={(e)=>setTitle(e.target.value)}
                                className="text-xl text-white placeholder-white bg-transparent border-b border-white"
                            />
                        </div>
                        <div className='col-span-1'>
                            <button 
                                type="submit"
                                className="bg-teal-500 shadow-lg shadow-teal-500/50 rounded-lg text-white px-3 py-1"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SubjectCreation