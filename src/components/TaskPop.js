import React, { useState } from "react";
import { FaWindowClose } from 'react-icons/fa'
import {PiFlagPennantFill} from 'react-icons/pi'
import { MdCancel } from 'react-icons/md'
import { AiFillCheckCircle } from 'react-icons/ai'
import TaskDeletePop from "./TaskDeletePop";

function TaskPop({setTaskPop, task}){
    const [isEdit, setIsEdit] = useState(false)
    const [editTitle, setEditTitle] = useState(task.title)
    const [editDueDate, setEditDueDate] = useState(task.dueDate)
    const [editPriority, setEditPriority] = useState(task.priority)
    const [editDesc, setEditDesc]  = useState(task.desc)
    const [editNotes, setEditNotes] = useState('notes')
    const [isDelete, setIsDelete] = useState(false)

    console.log(editTitle)

    function setPriorityFlagColor(task){
        if(task.isCompleted){
            return "green"
        }
        switch(task.priority){
            case 0:
                return "red"
            case 1:
                return "yellow"
            case 2:
                return "white"
        }
    }
    function setDDColor(priority){
        switch(priority){
            case 0:
                return "bg-red-500 bg-opacity-50 shadow-lg rounded-xl mb-2 px-2 py-1 text-white"
            case 1:
                return "bg-yellow-300 bg-opacity-50 shadow-lg rounded-xl mb-2 px-2 py-1 text-white"
            case 2:
                return "bg-slate-300 bg-opacity-50 shadow-lg rounded-xl mb-2 px-2 py-1 text-white"
        }
    }

    function handleCloseClick(){
        setIsEdit(false)
        setTaskPop(false)
    }

    function handleEditClick(){
        setIsEdit(true)
    }

    function handleDeleteClick(){
        setIsDelete(true)
    }
    
    function handleCancelClick(){
        setIsEdit(false)
        setEditTitle(task.title)
        setEditDueDate(task.dueDate)
        setEditPriority(task.priority)
        setEditDesc(task.desc)
        setEditNotes('notes')
    }

    function handleEditSave(){
        setTaskPop(false)
    }

        return(
        <>
            <div className={isDelete ? "fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex justify-center items-center blur-md" : "fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex justify-center items-center"}>
                <div className="h-2/3 bg-white bg-opacity-30 rounded-lg p-6 max-w-6xl w-full lg:w-4/5">
                    <div className="h-full">
                        {isEdit ? (
                            <div>
                                <div className="flex justify-between items-center border-b border-white mb-5 pb-2">
                                    <div className="flex justify-between items-center">
                                        <input
                                            type="text"
                                            placeholder={task.title}
                                            value={editTitle}
                                            onChange={(e)=>setEditTitle(e.target.value)}
                                            className=" ml-5 text-6xl font-bold text-white placeholder-white bg-transparent border border-white rounded-xl p-1"
                                        />
                                        <div className="ml-5 w-full">
                                            <input
                                                type="datetime-local"
                                                value={editDueDate}
                                                onChange={(e) => setEditDueDate(e.target.value)}
                                                className="bg-transparent text-white text-md border-b border-white pb-1 mb-2"
                                            />
                                            <div className="flex justify-between items-center ">
                                                <select 
                                                    onChange={(e)=>setEditPriority(e.target.value)}
                                                    className="text-white text-md border-b border-white pb-1 bg-transparent"
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
                                                <select 
                                                    onChange={(e)=>setEditPriority(e.target.value)}
                                                    className="text-white text-md border-b border-white pb-1 bg-transparent"
                                                >
                                                    <option disabled selected>
                                                        Status
                                                    </option>
                                                    <option>
                                                        In Progress
                                                    </option>
                                                    <option>
                                                        Completed
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="m-5">
                                        <button onClick={handleCloseClick}>
                                            <FaWindowClose size={50} color="white"/>
                                        </button>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 mt-10 h-[24rem]">
                                    <div className="col-span-1 mx-5 w-4/5">
                                        <div className="text-white text-3xl border-b border-white pb-1">
                                            Description
                                        </div>
                                        <textarea
                                            type="text"
                                            placeholder={task.desc}
                                            value={editDesc}
                                            onChange={(e) => setEditDesc(e.target.value)}
                                            className="bg bg-transparent border border-white text-white placeholder-white rounded-lg text-xl h-3/4 max-h-96 w-[95%] mt-5 mb-2 mx-4 p-2 "
                                        />
                                    </div>
                                    <div className="col-span-1 w-4/5 mx-5">
                                        <div className="text-white text-3xl border-b border-white pb-1">
                                            Notes
                                        </div>
                                        <textarea
                                            type="text"
                                            placeholder={task.notes}
                                            value={editNotes}
                                            onChange={(e) => setEditNotes(e.target.value)}
                                            className="bg bg-transparent border border-white text-white placeholder-white rounded-lg text-xl h-3/4 min-h-max max-h-96 w-[95%] mt-5 mb-2 mx-4 p-2 "
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        onClick={handleCancelClick}
                                        className='bg-red-400 shadow-lg shadow-teal-500/50 rounded-lg px-5 py-1 mx-5 text-white text-2xl'
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleEditSave}
                                        className='bg-teal-500 shadow-lg shadow-teal-500/50 rounded-lg px-5 py-1 text-white text-2xl'
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        ):(
                            <div>
                                <div className="flex justify-between items-center border-b border-white mb-5 pb-2">
                                    <div className="flex justify-between items-center">
                                        <div className=" ml-5 text-5xl font-bold text-white drop-shadow-xl">
                                            {task.title}
                                        </div>
                                        <div className="ml-5 min-w-[20%] text-w">
                                            <div className={setDDColor(task.priority)}>
                                                Due: {task.dueDate}
                                            </div>
                                            <div className="grid grid-cols-3 items-center ">
                                                <div className="col-span-1 p-1 place-self-center border-2 border-white border-opacity-60 rounded-2xl">
                                                    <PiFlagPennantFill color={setPriorityFlagColor(task)} />
                                                </div>
                                                <div className={task.isCompleted ? "col-span-2 text-white bg-green-300 bg-opacity-50 shadow-lg rounded-xl px-2 py-1 w-fit" : "col-span-2 text-white bg-yellow-300 bg-opacity-50 shadow-lg rounded-xl px-2 py-1 w-fit"}>
                                                    {task.isCompleted ? "Completed" : "In Progress"}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="m-5">
                                        <button onClick={handleCloseClick}>
                                            <FaWindowClose size={50} color="white"/>
                                        </button>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 mt-10 max-h-96 ">
                                    <div className="col-span-1 mx-5 w-4/5 h-2/3">
                                        <div className="text-white text-3xl border-b border-white pb-1">
                                            Description
                                        </div>
                                        <div className="text-xl text-white h-full max-h-96 mt-5 mb-2 mx-4 pb-1 overflow-y-scroll">
                                            {task.desc} Notes will go here. Notes will go here. Notes will go here. Notes will go here. Notes will go here. Notes will go here. Notes will go here. Notes will go here. Notes will go here. Notes will go here. Notes will go here. Notes will go here. Notes will go here. Notes will go here. Notes will go here. Notes will go here. Notes will go here. Notes will go here. Notes will go here. Notes will go here. Notes will go here. Notes will go here. Notes will go here. Notes will go here. Notes will go here. Notes will go here. Notes will go here. Notes will go here. Notes will go here. Notes will go here. Notes will go here. Notes will go here. 
                                        </div>
                                    </div>
                                    <div className="col-span-1 h-2/3 w-4/5 mx-5">
                                        <div className="text-white text-3xl border-b border-white pb-1">
                                            Notes
                                        </div>
                                        <div className="text-xl text-white h-full max-h-96 mt-5 mb-2 mx-4 pb-1 overflow-y-scroll">
                                            hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello 
                                        </div> 
                                    </div>
                                </div>
                                <div className="flex justify-between items-center mx-5 my-2">
                                    <button
                                        onClick={handleDeleteClick}
                                        className='bg-red-400 shadow-lg shadow-red-400/50 rounded-lg px-5 py-1 text-white text-2xl'
                                    >
                                        Delete
                                    </button>
                                    <button
                                        onClick={handleEditClick}
                                        className='bg-teal-500 shadow-lg shadow-teal-500/50 rounded-lg px-5 py-1 text-white text-2xl'
                                    >
                                        Edit
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {isDelete ? <TaskDeletePop setIsDelete={setIsDelete} /> : null}
        </>
    )
}

export default TaskPop