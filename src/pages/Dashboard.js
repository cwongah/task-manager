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
    
    // async function handleLogout(){
    //     try{
    //         await logOut()
    //         navigate('/')
    //     } catch(error){
    //         console.log(error.message)
    //     }
    // }

    useEffect(() => {
        if(!user){
            navigate('/')
        }
    }, [])

    useEffect( () => {
        if(user){
            // setTasks(await getTasks(user.uid))
            // const unsubscribe = getTasks(user.uid, setTasks)
            // return () => unsubscribe()
            // console.log(user.uid)
            // console.log(typeof(user.uid))
            getTasks(user.uid, setTasks)
        }
    }, [user])
    
    return(
        <>
            <div>
                Dashboard
            </div>
            {/* <button onClick={handleLogout}>
                Log Out
            </button> */}
            <button onClick={()=>setTcPop(true)}>
                Create Task
            </button>
            <button onClick={()=>setScPop(true)}>
                Create Subject
            </button>
            {tasks.map((task) => (
                <div key={task.id}>
                    {task.title} {task.desc}
                </div>
            ))}
            {tcPop ? <TaskCreation subjects={subjects} setTcPop={setTcPop} /> : null}
            {scPop ? <SubjectCreation setScPop={setScPop} /> : null}
        </>
    )
}

export default Dashboard