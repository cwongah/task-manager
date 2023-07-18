import React, { useState } from "react";
import { useUserAuth } from "../firebase/UserAuthContext";
import { addTask } from "../firebase/firestore";
import { useNavigate } from "react-router-dom";
import { FaWindowClose } from 'react-icons/fa'

function TaskCreation({subjects, setTcPop}){
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [dueDate, setDueDate] = useState()
    const [priority, setPriority] = useState(1)
    const [isCompleted, setIsCompleted] = useState(false)
    const [subjectId, setSubjectId] = useState('')
    const navigate = useNavigate()

    const { user } = useUserAuth()

    function handlePriority(e){
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

    function handleSubjectChange(e){
        setSubjectId(subjects.filter(subject => subject.title === e.target.value)[0].id)
    }

    function handleSubmit(e){
        e.preventDefault()
        console.log('submit')
        addTask(user.uid, title, desc, dueDate, priority, isCompleted, subjectId)
        navigate('/dashboard')

    }

    return(
        <>
            <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex justify-center items-center">
                <div className="h-3/4 bg-white bg-opacity-30 rounded-lg p-6 max-w-6xl w-full lg:w-3/4">
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
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="placeholder-white text-3xl text-white bg-transparent border-b border-white pb-1 w-4/5"
                                    />
                                </div>
                                <div className="my-20">
                                    <input
                                        type="datetime-local"
                                        // placeholder="Due Date"
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
                                                Subject
                                            </option>
                                            {subjects.map((subject)=>{
                                                return(
                                                    <option key={subject.id}>
                                                        {subject.title}
                                                    </option>
                                            ) 
                                        })}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-1 mx-5">
                                <div className="text-white text-3xl mt-10 mb-2 border-b border-white w-4/5 pb-1">
                                    Description
                                </div>
                                <textarea
                                    type="text"
                                    placeholder="Add you description here!"
                                    value={desc}
                                    onChange={(e) => setDesc(e.target.value)}
                                    className=" text-white text-xl bg-transparent w-4/5 px-3 my-3 h-full"
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
        </>
    )
}

export default TaskCreation