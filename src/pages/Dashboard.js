import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../firebase/UserAuthContext";
import { useEffect, useState } from "react";
import { getTasks } from "../firebase/firestore";
import TaskCreation from "../components/TaskCreation";
import SubjectCreation from "../components/SubjectCreation";
import TaskPop from "../components/TaskPop";

function Dashboard({subjects, sidebarToggle}){
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
                return "bg-red-500 bg-opacity-50 shadow-lg rounded-xl my-5 py-2 pl-2 grid grid-cols-5 items-center"
            case 1:
                return "bg-yellow-300 bg-opacity-50 shadow-lg rounded-xl my-5 py-2 pl-2 grid grid-cols-5 items-center"
            case 2:
                return "bg-slate-300 bg-opacity-50 shadow-lg rounded-xl my-5 py-2 pl-2 grid grid-cols-5 items-center"
        }
    }

    function handleTaskClick(task){
        setTaskToView(task)
        setTaskPop(true)
    }

    console.log(taskToView)

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
                <div className="bg-white bg-opacity-20 shadow-xl m-10 p-5 rounded-xl">
                    <div className="grid grid-cols-5 text-4xl text-white font-bold border-b border-white pb-3">
                        <div>
                            Title
                        </div>
                        <div>
                            Collection
                        </div>
                        <div> 
                            Status
                        </div>
                        <div>
                            Priority
                        </div>
                        <div>
                            Due Date
                        </div>
                    </div>
                        {tasks.map((task) => (
                            <div key={task.id} className={setPriorityColor(task.priority)} onClick={()=>handleTaskClick(task)}>
                                <div className="col-span-1 col-start-1 bg-white bg-opacity-20 shadow-md w-fit max-w-[75%] h-fit px-2 py-1 rounded-lg overflow-hidden">
                                    {task.title}
                                </div>
                                <div className="col-span-1 col-start-2 bg-white bg-opacity-20 shadow-md w-fit max-w-[75%] h-fit px-2 py-1 rounded-lg">
                                    {task.subjectTitle}
                                </div>
                                <div className="col-span-1 col-start-3 bg-white bg-opacity-20 shadow-md w-fit max-w-[75%] h-fit px-2 py-1 rounded-lg">
                                    {task.isCompleted ? "Completed" : "In Progress"}
                                </div>
                                <div className="col-span-1 col-start-4 bg-white bg-opacity-20 shadow-md w-fit max-w-[75%] h-fit px-2 py-1 rounded-lg">
                                    {task.urgency}
                                </div>
                                <div className="col-span-1 col-start- bg-white bg-opacity-20 shadow-md w-fit max-w-[75%] h-fit px-2 py-1 rounded-lg">
                                    {task.dueDate}
                                </div>
                            </div>
                        ))}
                </div>
                <button onClick={()=>setTcPop(true)}>
                    Create Task
                </button>
                <button onClick={()=>setScPop(true)}>
                    Create Subject
                </button>
            </div>
            {tcPop ? <TaskCreation subjects={subjects} setTcPop={setTcPop} /> : null}
            {scPop ? <SubjectCreation setScPop={setScPop} /> : null}
            {taskPop ? <TaskPop setTaskPop={setTaskPop} task={taskToView} /> : null}
        </>
    )
}

export default Dashboard