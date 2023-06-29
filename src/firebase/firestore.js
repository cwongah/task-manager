import { db } from "./firebase";
import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, orderBy, query, setDoc, snapshotEqual, where } from 'firebase/firestore'

const TASKS_COLLECTION = 'tasks'

export function addTask(uid, title, desc, dueDate, priority){
    addDoc(collection(db, TASKS_COLLECTION), {uid, title, desc, dueDate, priority})
}

// export async function getTasks(uid, setTasks){
//     const tasks = query(collection(db, TASKS_COLLECTION), where("uid", "==", uid), orderBy("dueDate"))

//     const unsubscribe = onSnapshot(tasks, async (snapshot) => {
//         let allTasks = []
//         for (const documentSnapshot of snapshot.docs) {
//             const task = documentSnapshot.data()
//             allTasks.push({
//                 ...task,
//                 date: task['dueDate'],
//                 id: documentSnapshot.id
//             })
//         }
//         setTasks(allTasks)
//     })

//     const querySnapshot = await getDocs(tasks)

//     let allTasks = []
//     for(const documentSnapshot of querySnapshot.docs){
//         const task = documentSnapshot.data()
//         allTasks.push({
//             ...task,
//             dueDate: task['dueDate'],
//             id: documentSnapshot.id
//         })
//     }
//     return unsubscribe
// }

export async function getTasks(uid, setTask){
    const tasksQuery = query(collection(db, TASKS_COLLECTION), where('uid', '==', uid), orderBy('priority'), orderBy('dueDate'))
    const unsubscribe = onSnapshot(tasksQuery, async (snapshot) => {
        let allTasks = []
        for(const documentSnapshot of snapshot.docs){
            const task = documentSnapshot.data()
            allTasks.push({
                ...task,
                dueDate: task['dueDate'],
                id: documentSnapshot.id
            })
        }
        console.log(allTasks)
        setTask(allTasks)
    })
    return unsubscribe
}