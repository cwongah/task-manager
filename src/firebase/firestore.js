import { db } from "./firebase";
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, setDoc, where } from 'firebase/firestore'

const TASKS_COLLECTION = 'tasks'

export function addTask(uid, title, desc, dueDate, priority){
    addDoc(collection(db, TASKS_COLLECTION), {uid, title, desc, dueDate, priority})
}