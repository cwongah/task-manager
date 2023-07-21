import { db } from "./firebase";
import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, orderBy, query, setDoc, snapshotEqual, where } from 'firebase/firestore'

const TASKS_COLLECTION = 'tasks'
const SUBJECTS_COLLECTION = 'subjects'

export function addSubject(uid, title){
    addDoc(collection(db, SUBJECTS_COLLECTION), {uid, title})
}

export function addTask(uid, title, desc, dueDate, priority, isCompleted, subjectId, subjectTitle){
    addDoc(collection(db, TASKS_COLLECTION), {uid, title, desc, dueDate, priority, isCompleted, subjectId, subjectTitle})
}

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
        // console.log(allTasks)
        setTask(allTasks)
    })
    return unsubscribe
}

export async function getSubjects(uid, setSubjects){
    const subjectsQuery = query(collection(db, SUBJECTS_COLLECTION), where('uid', '==', uid))
    const unsubscribe = onSnapshot(subjectsQuery, async (snapshot) => {
        let allSubjects = []
        for(const documentSnapshot of snapshot.docs){
            const subject = documentSnapshot.data()
            allSubjects.push({
                ...subject,
                id: documentSnapshot.id
            })
        }
        setSubjects(allSubjects)
    })
    return unsubscribe
}

export async function getTasksBySubject(sid, setTasksBySubject){
    const tasksBySubjectQuery = query(collection(db, TASKS_COLLECTION), where('subjectId', '==', sid), orderBy('priority'), orderBy('dueDate'))
    const unsubscribe = onSnapshot(tasksBySubjectQuery, async (snapshot) => {
        let allTasksBySubject = []
        for(const documentSnapshot of snapshot.docs){
            const task = documentSnapshot.data()
            allTasksBySubject.push({
                ...task,
                id: documentSnapshot.id
            })
        }
        setTasksBySubject(allTasksBySubject)
    })
    return unsubscribe
}