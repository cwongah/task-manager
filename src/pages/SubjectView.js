import React, { useEffect, useState } from "react";
import { getTasksBySubject } from "../firebase/firestore";

function SubjectView({currentSubject}){
    const [tasksBySubject, setTasksBySubject] = useState([])

    useEffect(()=>{
        getTasksBySubject(currentSubject.id, setTasksBySubject)
    }, [currentSubject])

    console.log(tasksBySubject)

    return(
        <div>
            {currentSubject.title}
            {tasksBySubject.map((task)=>(
                <div key={task.id}>
                    {task.title} {task.desc}
                </div>
            ))}
        </div>
    )
}

export default SubjectView