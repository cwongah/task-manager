import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../firebase/UserAuthContext";
import { useEffect, useState } from "react";
import { getTasks } from "../firebase/firestore";
import TaskCreation from "./TaskCreation";
import SubjectCreation from "./SubjectCreation";

function Dashboard({subjects}){
    const { logOut, user} = useUserAuth()
    const navigate = useNavigate()
    const [tasks, setTasks] = useState([])
    const [tcPop, setTcPop] = useState(false)
    const [scPop, setScPop] = useState(false)

    // console.log(tasks)

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
            <div className="p-5">
                <div className="text-white text-8xl font-bold">
                    Welcome Back!
                </div>
                {tasks.map((task) => (
                    <div key={task.id}>
                        {task.title} {task.desc}
                    </div>
                ))}
            </div>
            <button onClick={()=>setTcPop(true)}>
                Create Task
            </button>
            <button onClick={()=>setScPop(true)}>
                Create Subject
            </button>
            {tcPop ? <TaskCreation subjects={subjects} setTcPop={setTcPop} /> : null}
            {scPop ? <SubjectCreation setScPop={setScPop} /> : null}
        </>
    )
}

export default Dashboard