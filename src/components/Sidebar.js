import React, { useEffect, useState } from "react";
import {BiArrowBack} from 'react-icons/bi'
import { useUserAuth } from "../firebase/UserAuthContext";
import { getSubjects, addSubject } from "../firebase/firestore";
import { useNavigate } from "react-router-dom";
import { MdCancel } from 'react-icons/md'
import { AiFillCheckCircle } from 'react-icons/ai'

function Sidebar({sidebarToggle, setSidebarToggle, setCurrentSubject, subjects, setSubjects}){
    const navigate = useNavigate()
    const [isNewSub, setIsNewSub] = useState(false)
    const [newSub, setNewSub] = useState('')

    const { user } = useUserAuth()

    function handleBackClick(){
        setNewSub('')
        setSidebarToggle(false)
        setIsNewSub(false)
    }

    function handleSubjectClick(subject){
        setCurrentSubject(subject)
        setSidebarToggle(false)
        setIsNewSub(false)
        navigate(`/subject/${subject.title}`)
    }

    function handleDashboardCLick(){
        setSidebarToggle(false)
        setNewSub('')
        setIsNewSub(false)
        navigate('/dashboard')
    }
    
    function handleNewSubSubmit(e){
        e.preventDefault()
        addSubject(user.uid, newSub)
        setNewSub('')
    }

    function closeNewSub(){
        setNewSub('')
        setIsNewSub(false)
    }
    
    useEffect(()=>{
        if(user){
            getSubjects(user.uid, setSubjects)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    return (
        <div>
            <div
                className={`${
                    sidebarToggle
                        ? "md:left-0 w-full"
                        : "md:left-[-300px] w-0"
                } transition-all duration-500 ease-in-out md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 overflow-hidden`}
                style={{ left: sidebarToggle ? "0" : "-300px" }}
            >
                <div className='min-h-screen bg-gradient-to-bl from-[#7AE6C5] via-indigo-600 to-purple-800'>
                    <div className=" bg-white bg-opacity-30 min-h-screen p-4 ">
                        <button onClick={handleBackClick}>
                            {<BiArrowBack color="white" />}
                        </button>
                        <div className="border-b border-gray-500 pb-3 grid justify-items-center">
                            <button 
                                onClick={handleDashboardCLick}
                                className=" text-white bg-teal-200 shadow-lg bg-opacity-30 w-3/4 rounded-3xl my-2 py-1"
                            >
                                Dashboard
                            </button>
                            {!isNewSub ? (
                                <button 
                                    onClick={()=>setIsNewSub(true)}
                                    className=" text-white bg-teal-200 shadow-lg bg-opacity-30 w-3/4 rounded-3xl my-2 py-1"
                                >
                                    Create Collection
                                </button>
                                ):
                                <form 
                                    onSubmit={handleNewSubSubmit} 
                                    className="flex justify-between items-center bg-teal-200 shadow-lg w-3/4 bg-opacity-30 rounded-3xl my-2 py-1 px-2"
                                >
                                    <input 
                                        onChange={(e)=>setNewSub(e.target.value)} 
                                        value={newSub}
                                        placeholder="New Subject"
                                        className="w-2/3 bg-transparent text-white placeholder-white"
                                    />
                                    <div>
                                        <button 
                                            type="submit"
                                        >
                                            <AiFillCheckCircle size={20} color="green"/>
                                        </button>
                                        <button 
                                            onClick={closeNewSub}
                                        >
                                            <MdCancel size={20} color="red"/>
                                        </button>
                                    </div>
                                </form>
                            }
                        </div>
                        <div className="grid justify-items-center font-bold text-2xl text-white my-5">
                            Your Collections
                        </div>
                        <div className="grid justify-items-center">
                            {subjects.map((subject)=>(
                                <button
                                    key={subject.id}
                                    onClick={()=>handleSubjectClick(subject)}
                                    className=" text-white bg-teal-200 shadow-lg bg-opacity-30 w-3/4 rounded-3xl my-2 py-1"
                                >
                                    {subject.title}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar