import React, { useState } from 'react'
import { useUserAuth } from '../firebase/UserAuthContext'
import { useNavigate } from 'react-router-dom'

function Signup() {
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [password, setPassword] = useState('')
    const { signUp } = useUserAuth()
    let navigate = useNavigate()

    async function handleSubmit(e){
        e.preventDefault()
        setError('')
        try{
            await signUp(email, password)
            navigate('/')
        } catch(err){
            setError(err.message)
            console.log(err.message)
            alert(err.message)
        }
    }

    return(
        <>
            <h2>Firebase Auth Signup</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type='submit' >
                    Signup
                </button>
            </form>
            <button onClick={() => navigate('/')} >
                Already have any account?
            </button>
        </>
    )
} 

export default Signup