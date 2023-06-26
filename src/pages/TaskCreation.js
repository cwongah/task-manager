import React, { useState } from "react";
import { useUserAuth } from "../firebase/UserAuthContext";
import { addTask } from "../firebase/firestore";

function TaskCreation(){
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [dueDate, setDueDate] = useState()
    const [priority, setPriority] = useState(1)

    const { user } = useUserAuth()

    console.log(title)
    console.log(desc)
    console.log(dueDate)
    console.log(priority)
    console.log(user)

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
        }
    }

    function handleSubmit(e){
        e.preventDefault()
        console.log('submit')
        addTask(user.uid, title, desc, dueDate, priority)
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
                <button type="submit">Submit</button>
            </form>
        </>
    )
}

export default TaskCreation