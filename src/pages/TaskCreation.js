import React, { useState } from "react";
import { useUserAuth } from "../firebase/UserAuthContext";
import { addTask } from "../firebase/firestore";
import { useNavigate } from "react-router-dom";

function TaskCreation({subjects, setTcPop}){
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [dueDate, setDueDate] = useState()
    const [priority, setPriority] = useState(1)
    const [isCompleted, setIsCompleted] = useState(false)
    const [subjectId, setSubjectId] = useState('')
    const navigate = useNavigate()

    const { user } = useUserAuth()

    function handlePriority(e){
        switch(e.target.value){
            case 'Low Priority':
                setPriority(2)
                break
            case 'Regular':
                setPriority(1)
                break
            case 'Urgent':
                setPriority(0)
                break
            default:
                setPriority(1)
        }
    }

    function handleSubjectChange(e){
        setSubjectId(subjects.filter(subject => subject.title === e.target.value)[0].id)
    }

    function handleSubmit(e){
        e.preventDefault()
        console.log('submit')
        addTask(user.uid, title, desc, dueDate, priority, isCompleted, subjectId)
        navigate('/dashboard')

    }

    return(
        <>
            <div>
                Task Creator
            </div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Task Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                />
                <input
                    type="datetime-local"
                    // placeholder="Due Date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                />
                <select onChange={handlePriority}>
                    <option disabled selected>
                        Priority
                    </option>
                    <option>
                        Low Priority
                    </option>
                    <option>
                        Regular
                    </option>
                    <option>
                        Urgent
                    </option>
                </select>
                <select onChange={(e)=>handleSubjectChange(e)}>
                    <option disabled selected>
                        Subject
                    </option>
                    {subjects.map((subject)=>{
                       return(
                            <option key={subject.id}>
                                {subject.title}
                            </option>
                       ) 
                    })}
                </select>
                <button type="submit">Submit</button>
                <button onClick={()=>setTcPop(false)}>Close</button>
            </form>
        </>
    )
}

export default TaskCreation