import React, { useState } from "react";
import { useUserAuth } from "../firebase/UserAuthContext";
import { addSubject } from "../firebase/firestore";
import { useNavigate } from "react-router-dom";

function SubjectCreation(){
    const { user } = useUserAuth()
    const [title, setTitle] = useState('')
    const navigate = useNavigate()

    function handleSubmit(e){
        e.preventDefault()
        addSubject(user.uid, title)
        navigate('/dashboard')
    }

    return(
        <div>
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
        </div>
    )
}

export default SubjectCreation