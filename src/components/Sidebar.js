import React, { useEffect } from "react";
import {BiArrowBack} from 'react-icons/bi'
import { useUserAuth } from "../firebase/UserAuthContext";
import { getSubjects } from "../firebase/firestore";
import { useNavigate } from "react-router-dom";

function Sidebar({sidebarToggle, setSidebarToggle, setCurrentSubject, subjects, setSubjects}){
    const navigate = useNavigate()

    const { user } = useUserAuth()

    function handleClick(subject){
        setCurrentSubject(subject)
        navigate(`/subject/${subject.title}`)
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
                <button onClick={()=>setSidebarToggle(false)}>{<BiArrowBack />}</button>
                {subjects.map((subject)=>(
                    <div key={subject.id}>
                        <button onClick={()=>handleClick(subject)}>
                            {subject.title}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Sidebar