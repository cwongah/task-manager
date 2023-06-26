import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../firebase/UserAuthContext";

function Dashboard(){
    const { logOut, user} = useUserAuth()
    const navigate = useNavigate()
    async function handleLogout(){
        try{
            await logOut()
            navigate('/')
        } catch(error){
            console.log(error.message)
        }
    }
    
    console.log(user)
    console.log(user.uid)
    return(
        <>
            <div>
                Dashboard
            </div>
            <button onClick={handleLogout}>
                Log Out
            </button>
            <button onClick={()=>navigate('/new-task')}>
                Create Task
            </button>
        </>
    )
}

export default Dashboard