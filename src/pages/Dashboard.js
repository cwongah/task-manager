import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../firebase/UserAuthContext";
import { useEffect, useState } from "react";
import { getTasks } from "../firebase/firestore";
import TaskCreation from "./TaskCreation";

function Dashboard({subjects}){
    const { logOut, user} = useUserAuth()
    const navigate = useNavigate()
    const [tasks, setTasks] = useState([])
    const [tcPop, setTcPop] = useState(false)

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
            <button onClick={()=>navigate('/new-subject')}>
                Create Subject
            </button>
            {tasks.map((task) => (
                <div key={task.id}>
                    {task.title} {task.desc}
                </div>
            ))}
            {tcPop ? (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg opacity-50 flex justify-center items-center">
                    <div className="h-3/4 bg-white rounded-lg p-6 max-w-6xl w-full lg:w-3/4 overflow-y-scroll">
                        <TaskCreation subjects={subjects} setTcPop={setTcPop} />
                    </div>
                </div>
            ) : null}
        </>
    )
}

export default Dashboard