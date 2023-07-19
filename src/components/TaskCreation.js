import React, { useEffect, useState } from "react";
import { useUserAuth } from "../firebase/UserAuthContext";
import { addTask } from "../firebase/firestore";
import { addSubject } from "../firebase/firestore";
import { useNavigate } from "react-router-dom";
import { FaWindowClose } from 'react-icons/fa'
import { MdCancel } from 'react-icons/md'
import { AiFillCheckCircle } from 'react-icons/ai'

function TaskCreation({subjects, setTcPop}){
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [dueDate, setDueDate] = useState('')
    const [priority, setPriority] = useState(1)
    const [urgency, setUrgency] = useState('')
    const [subjectId, setSubjectId] = useState('')
    const [subjectTitle, setSubjectTitle] = useState('')
    const [isNewSubject, setIsNewSubject] = useState(false)
    const [newSubject, setNewSubect] = useState('')
    const navigate = useNavigate()

    const today = new Date();
    const date = today.getFullYear()+'-'+(today.getMonth() + 1 > 9 ? today.getMonth() + 1 : "0"+(today.getMonth() + 1))+'-'+(today.getDate() > 9 ? today.getDate(): "0"+today.getDate());
    const time = (today.getHours() > 9 ? today.getHours(): "0"+today.getHours()) + ":" + (today.getMinutes() > 9 ? today.getMinutes(): "0"+today.getMinutes())
    const dateTime = date+' '+time;

    const { user } = useUserAuth()

    console.log(newSubject)

    function handlePriority(e){
        setUrgency(e.target.value)
        switch(e.target.value){
            case 'Low Priority':
                setPriority(2)
                break
            case 'Regular':
                setPriority(1)
                break
            case 'Urgent':
                setPriority(0)
                break
            default:
                setPriority(1)
        }
    }

    function handleNewSubjectClick(e){
        e.preventDefault()
        setNewSubect('')
        setIsNewSubject(!isNewSubject)
    }

    function handleSubjectChange(e){
        setSubjectId(subjects.filter(subject => subject.title === e.target.value)[0].id)
        setSubjectTitle(subjects.filter(subject => subject.title === e.target.value)[0].title)
    }

    function handleSubmit(e){
        e.preventDefault()
        if(title === '' || desc === '' || subjectId === ''){
            alert('Fields missing!')
            return
        }
        addTask(user.uid, title, desc, dueDate, priority, urgency, false, subjectId, subjectTitle)
        setTcPop(false)
    }

    function handleNewSubjectSubmit(e){
        e.preventDefault()
        if(newSubject === ''){
            alert("No title provided!")
            return
        }
        setIsNewSubject(false)
        addSubject(user.uid, newSubject)
        // navigate('/dashboard')
    }

    useEffect(()=>{
        setDueDate(dateTime)
    },[])

    return(
        <>
            <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex justify-center items-center">
                <div className="h-2/3 bg-white bg-opacity-30 rounded-lg p-6 max-w-6xl w-full lg:w-3/4">
                    <div className="h-full">
                        <div className="flex justify-between items-center text-6xl font-bold text-white border-b border-white mb-5 pb-2">
                            <div className="">
                                What's new?
                            </div>
                            <div className="mr-5">
                                <button onClick={()=>setTcPop(false)}>
                                    <FaWindowClose size={50}/>
                                </button>
                            </div>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-2 gap-8">
                                <div className="col-span-1 mx-5">
                                    <div className="my-10">
                                        <input
                                            type="text"
                                            placeholder="Task Title"
                                            maxLength={50}
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            className="placeholder-white text-3xl text-white bg-transparent border-b border-white pb-1 w-4/5"
                                        />
                                    </div>
                                    <div className="my-20">
                                        <input
                                            type="datetime-local"
                                            value={dueDate}
                                            onChange={(e) => setDueDate(e.target.value)}
                                            className="bg-transparent text-white text-3xl border-b border-white pb-1 w-4/5"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 w-4/5">
                                        <div className="col-span-1">
                                            <select 
                                                onChange={handlePriority}
                                                className="text-white text-3xl border-b border-white pb-1 bg-transparent"
                                            >
                                                <option disabled selected>
                                                    Priority
                                                </option>
                                                <option>
                                                    Low Priority
                                                </option>
                                                <option>
                                                    Regular
                                                </option>
                                                <option>
                                                    Urgent
                                                </option>
                                            </select>
                                        </div>
                                        <div className="col-span-1">
                                            <select 
                                                onChange={(e)=>handleSubjectChange(e)}
                                                className="text-white text-3xl border-b border-white pb-1 w-full bg-transparent"
                                            >
                                                <option disabled selected>
                                                    Collection
                                                </option>
                                                {subjects.map((subject)=>{
                                                    return(
                                                        <option key={subject.id}>
                                                            {subject.title}
                                                        </option>
                                                    ) 
                                                })}
                                            </select>
                                            {!isNewSubject ? 
                                                <div className="mt-5 w-full grid place-items-end">
                                                    <button 
                                                        onClick={handleNewSubjectClick}
                                                        className="text-white underline"
                                                    >
                                                        Add New Collection
                                                    </button>
                                                </div>
                                            :
                                                <div className="mt-5 w-full grid place-items-end">
                                                    <div className="flex justify-between items-center border-b border-white pl-2">
                                                        <input
                                                            type="text"
                                                            placeholder="New Collection"
                                                            value={newSubject}
                                                            onChange={(e) => setNewSubect(e.target.value)}
                                                            className="bg-transparent text-white placeholder-white w-3/4"
                                                        />
                                                        <div>
                                                            <button 
                                                                onClick={handleNewSubjectSubmit}
                                                            >
                                                                <AiFillCheckCircle color="#15b8a6"/>
                                                            </button>
                                                            <button 
                                                                onClick={handleNewSubjectClick}
                                                            >
                                                                <MdCancel color="red"/>
                                                            </button>
                                                        </div>
                                                    </div>    
                                                </div>                                        
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-1 h-full mx-5">
                                    <div className="text-white text-3xl mt-10 mb-2 border-b border-white w-4/5 pb-1">
                                        Description
                                    </div>
                                    <textarea
                                        type="text"
                                        placeholder="Add you description here!"
                                        value={desc}
                                        onChange={(e) => setDesc(e.target.value)}
                                        className=" text-white text-xl bg-transparent w-4/5 p-3 my-3 h-2/3 border border-white rounded-lg"
                                        />
                                    <div className="grid place-items-end w-4/5 my-10">
                                        <button 
                                            type="submit"
                                            className="bg-teal-500 shadow-lg shadow-teal-500/50 rounded-lg px-4 py-2 text-white text-2xl"
                                            >
                                            Create Task
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TaskCreation