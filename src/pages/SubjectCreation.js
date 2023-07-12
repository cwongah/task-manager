import React, { useState } from "react";
import { useUserAuth } from "../firebase/UserAuthContext";
import { addSubject } from "../firebase/firestore";
import { useNavigate } from "react-router-dom";

function SubjectCreation({setScPop}){
    const { user } = useUserAuth()
    const [title, setTitle] = useState('')
    const navigate = useNavigate()

    function handleSubmit(e){
        e.preventDefault()
        addSubject(user.uid, title)
        navigate('/dashboard')
    }

    return(
        <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg opacity-50 flex justify-center items-center">
            <div className="h-1/4 bg-white rounded-lg p-6 max-w-6xl w-1/2 lg:w-3/4 ">
                <div>Subject Creation</div>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e)=>setTitle(e.target.value)}
                    />
                    <button type="submit">Submit</button>
                </form>
                <button onClick={()=>setScPop(false)}>Close</button>
            </div>
        </div>
    )
}

export default SubjectCreation