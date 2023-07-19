import React, { useEffect, useState } from "react";
import { FaWindowClose } from 'react-icons/fa'
import { MdCancel } from 'react-icons/md'
import { AiFillCheckCircle } from 'react-icons/ai'

function TaskPop({setTaskPop, task}){
        return(
        <>
            <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex justify-center items-center">
                <div className="h-4/5 bg-white bg-opacity-30 rounded-lg p-6 max-w-6xl w-full lg:w-4/5">
                    <div className="h-full">
                        <div className="flex justify-between items-center text-6xl font-bold text-white border-b border-white mb-5 pb-2">
                            <div className="ml-5">
                                {task.title}
                            </div>
                            <div className="mr-5">
                                <button onClick={()=>setTaskPop(false)}>
                                    <FaWindowClose size={50}/>
                                </button>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-8">
                            <div className="col-span-1 mx-5">
                                <div className="grid grid-cols-2 my-10">
                                    <div className="col-span-1">
                                        <div className="text-white text-3xl px-2 mb-5 border-b border-white w-4/5 pb-1">
                                            Priority
                                        </div>
                                        <div className="px-4">
                                            {task.urgency}
                                        </div>
                                    </div>
                                    <div className="col-span-1">
                                        <div className="text-white text-3xl px-2 mb-5 border-b border-white w-4/5 pb-1">
                                            Due Date
                                        </div>
                                        <div className="px-4">
                                            {task.dueDate}
                                        </div>
                                    </div>
                                </div>
                                <div className="my-20">
                                    <div className="text-white text-3xl mt-10 mb-2 border-b border-white w-[90%] pb-1">
                                        Description
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 w-4/5">
                                    <div className="col-span-1">
                                        
                                    </div>
                                    <div className="col-span-1">
                                        
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-1 h-full mx-5">
                                <div className="text-white text-3xl mt-10 mb-2 border-b border-white w-4/5 pb-1">
                                    Notes
                                </div>

                                <div className="grid place-items-end w-4/5 my-10">

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TaskPop