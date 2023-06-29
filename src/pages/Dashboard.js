import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../firebase/UserAuthContext";
import { useEffect, useState } from "react";
import { getTasks } from "../firebase/firestore";

function Dashboard(){
    const { logOut, user} = useUserAuth()
    const navigate = useNavigate()
    const [tasks, setTasks] = useState([])

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
            <button onClick={()=>navigate('/new-task')}>
                Create Task
            </button>
            {tasks.map((task) => (
                <div key={task.id}>
                    {task.title} {task.desc}
                </div>
            ))}
        </>
    )
}

export default Dashboard