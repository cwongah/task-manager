import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "./firebase";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";

const userAuthContext = createContext()

export function UserAuthContextProvider({ children }) {
    const [user, setUser] = useState({})

    function logIn(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }

    function signUp(email, password) {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    function logOut() {
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log("Auth", currentUser)
            setUser(currentUser)
        })

        return () => {
            unsubscribe()
        }
    }, [])

    return (
        <userAuthContext.Provider value={{user, logIn, signUp, logOut}} >{children}</userAuthContext.Provider>
    )
}

export function useUserAuth() {
    return useContext(userAuthContext)
}