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
        </div>
    )
}

export default SubjectView