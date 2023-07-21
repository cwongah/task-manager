import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../firebase/UserAuthContext";
import { useEffect, useState } from "react";
import { getTasks } from "../firebase/firestore";
import TaskCreation from "../components/TaskCreation";
import SubjectCreation from "../components/SubjectCreation";
import TaskPop from "../components/TaskPop";
import {PiFlagPennantFill} from 'react-icons/pi'
import {MdOutlinePostAdd} from 'react-icons/md'
import{RiFolderAddLine} from 'react-icons/ri'
import {BsThreeDotsVertical} from 'react-icons/bs'

function Dashboard({subjects}){
    const { logOut, user} = useUserAuth()
    const navigate = useNavigate()
    const [tasks, setTasks] = useState([])
    const [taskToView, setTaskToView] = useState()
    const [tcPop, setTcPop] = useState(false)
    const [scPop, setScPop] = useState(false)
    const [taskPop, setTaskPop] = useState(false)

    function setPriorityColor(priority){
        switch(priority){
            case 0:
                return "bg-red-500 bg-opacity-50 shadow-lg rounded-xl my-5 py-2 pl-2 grid grid-cols-9 items-center"
            case 1:
                return "bg-yellow-300 bg-opacity-50 shadow-lg rounded-xl my-5 py-2 pl-2 grid grid-cols-9 items-center"
            case 2:
                return "bg-slate-300 bg-opacity-50 shadow-lg rounded-xl my-5 py-2 pl-2 grid grid-cols-9 items-center"
        }
    }

    function setPriorityFlagColor(priority){
        switch(priority){
            case 0:
                return "red"
            case 1:
                return "yellow"
            case 2:
                return "white"
        }
    }

    function handleTaskClick(task){
        setTaskToView(task)
        setTaskPop(true)
    }

    // console.log(taskToView)
    console.log(subjects)

    useEffect(() => {
        if(!user){
            navigate('/')
        }
    }, [])

    useEffect( () => {
        if(user){
            getTasks(user.uid, setTasks)
        }
    }, [user])
    
    return(
        <>
            <div className={tcPop || scPop || taskPop  ? "p-5 blur-lg" : "p-5" }>
                <div className="text-white text-8xl font-bold mx-10 ">
                    Welcome Back!
                </div>
                <div className="bg-white bg-opacity-20 shadow-xl m-10 px-5 py-2 rounded-xl">
                    <div className="text-white py-2 flex justify-end items-center">
                        <button 
                            onClick={()=>setTcPop(true)}
                            className="flex justify-between w-[10%] items-center text-lg bg-slate-700 bg-opacity-30 p-2 rounded-xl shadow-md"
                        >
                            <MdOutlinePostAdd/>Create Task
                        </button>
                        <button 
                            onClick={()=>setScPop(true)}
                            className="flex justify-between w-[12%] items-center text-lg bg-slate-700 bg-opacity-30 p-2 mx-5 rounded-xl shadow-md"
                        >
                            <RiFolderAddLine />Create Subject
                        </button>
                    </div>
                    <div className="grid grid-cols-9 text-2xl text-white font-bold border-b border-white pb-3">
                        <div className="col-span-3 col-start-1">
                            Task
                        </div>
                        <div className="col-span-2 col-start-4">
                            Collection
                        </div>
                        <div className="col-span-1 col-start-6"> 
                            Priority
                        </div>
                        <div className="col-span-1 col-start-7">
                            Progress
                        </div>
                        <div className="col-span-1 col-start-8">
                            Due Date
                        </div>
                        <div className="col-span-1 col-start-9">
                            Time
                        </div>
                    </div>
                        {tasks.map((task) => (
                            <div key={task.id} className={setPriorityColor(task.priority)} onClick={()=>handleTaskClick(task)}>
                                <div className="col-span-3 col-start-1 bg-white bg-opacity-20 shadow-md w-fit max-w-[75%] h-fit px-2 py-1 rounded-lg overflow-hidden">
                                    {task.title}
                                </div>
                                <div className="col-span-2 col-start-4 bg-white bg-opacity-20 shadow-md w-fit max-w-[75%] h-fit px-2 py-1 rounded-lg">
                                    {task.subjectTitle}
                                </div>
                                <div className="col-span-1 col-start-6 bg-white bg-opacity-20 shadow-md w-fit max-w-[75%] h-fit px-2 py-1 ml-[15%] rounded-3xl">
                                    <PiFlagPennantFill color={setPriorityFlagColor(task.priority)}/>
                                </div>
                                <div className="col-span-1 col-start-7 bg-white bg-opacity-20 shadow-md w-fit max-w-[75%] h-fit px-2 py-1 rounded-lg">
                                    {task.isCompleted ? "Completed" : "In Progress"}
                                </div>
                                 <div className="col-span-1 col-start-8 bg-white bg-opacity-20 shadow-md w-fit max-w-[75%] h-fit px-2 py-1 rounded-lg">
                                    {task.dueDate.substring(0, 10)}
                                </div>
                                <div className="flex justify-between items-center col-span-1 col-start-9">
                                    <div className="bg-white bg-opacity-20 shadow-md w-fit h-fit px-2 py-1 rounded-lg">
                                        {task.dueDate.substring(11, 16)}
                                    </div>
                                    {/* <div className="opacity-50 mr-5">
                                        <BsThreeDotsVertical color="black"/>
                                    </div> */}
                                </div>
                            </div>
                        ))}
                </div>
            </div>
            {tcPop ? <TaskCreation subjects={subjects} setTcPop={setTcPop} /> : null}
            {scPop ? <SubjectCreation setScPop={setScPop} /> : null}
            {taskPop ? <TaskPop setTaskPop={setTaskPop} task={taskToView} /> : null}
        </>
    )
}

export default Dashboard