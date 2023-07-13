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
    // console.log(user)

    function handleBackClick(){
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
        setIsNewSub(false)
        navigate('/dashboard')
    }
    
    function handleSubmit(e){
        e.preventDefault()
        addSubject(user.uid, newSub)
        console.log(newSub)
    }
    
    useEffect(()=>{
        if(user){
            getSubjects(user.uid, setSubjects)
        }
    }, [user])

    return (
        <div>
            <div
                className={`${
                    sidebarToggle
                        ? "md:left-0 w-full"
                        : "md:left-[-300px] w-0"
                } transition-all duration-500 ease-in-out md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6 overflow-hidden`}
                style={{ left: sidebarToggle ? "0" : "-300px" }}
            >
                <button onClick={handleBackClick}>{<BiArrowBack />}</button>
                {subjects.map((subject)=>(
                    <div key={subject.id}>
                        <button onClick={()=>handleSubjectClick(subject)}>
                            {subject.title}
                        </button>
                    </div>
                ))}
                <div className="border-t border-gray-500 my-3 py-3">
                    <button onClick={handleDashboardCLick}>Dashboard</button>
                    <div>
                        {!isNewSub ? (
                            <button onClick={()=>setIsNewSub(true)}>Create Subject</button>
                            ):
                            <div className="flex">
                                <form onSubmit={handleSubmit} className="flex items-center">
                                    <input 
                                        onChange={(e)=>setNewSub(e.target.value)} 
                                        value={newSub}
                                        placeholder="New Subject"
                                        className="w-3/4"
                                    />
                                    <div className="ml-2">
                                        <button type="submit"><AiFillCheckCircle size={20} color="green"/></button>
                                        <button onClick={()=>setIsNewSub(false)}><MdCancel size={20} color="red"/></button>
                                    </div>
                                </form>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar