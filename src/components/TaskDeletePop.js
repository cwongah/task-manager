import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaWindowClose } from 'react-icons/fa'
import {FiAlertOctagon} from 'react-icons/fi'
import { deleteTask } from "../firebase/firestore";

function TaskDeletePop({setIsDelete, setTaskPop, task}){
    function handleDeleteClick(){
        setIsDelete(false)
        setTaskPop(false)
        deleteTask(task.id)
    }

    console.log(task.id)

    return(
        <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex justify-center items-center">
            <div className="h-fill w-1/4 bg-white bg-opacity-30 rounded-lg p-6 max-w-6xl">
                <div className="text-white text-3xl font-bold border-b border-white mb-6 pb-1 flex justify-between items-center">
                    <div>
                        Are you sure?
                    </div>
                    <div>
                        <button 
                            onClick={()=>setIsDelete(false)}
                            className="mr-1"
                        >
                            <FaWindowClose size={25}/>
                        </button>
                    </div>
                </div>
                <div className="flex items-center">
                    <FiAlertOctagon color="white" className="mx-2"/>
                    <div className='text-white text-center'>
                        This will <span className="font-bold underline underline-offset-2">permanently</span> delete your task!
                    </div>
                </div>
                <div className='flex justify-center items-center my-5'>
                <button 
                    onClick={handleDeleteClick}
                    className="bg-red-400 shadow-lg shadow-red-400/50 rounded-lg text-white px-3 py-1 "
                >
                    Delete
                </button>
                </div>
            </div>
        </div>
    )
}

export default TaskDeletePop