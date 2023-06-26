import React, { useEffect, useState } from 'react'
import { useUserAuth } from '../firebase/UserAuthContext'
import { useNavigate } from 'react-router-dom'

function Login(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    // const [error, setError] = useState('')
    const { logIn, user } = useUserAuth()
    const navigate = useNavigate()

    async function handleSubmit(e){
        e.preventDefault()
        // setError('')
        try{
            await logIn(email, password)
            navigate('/dashboard')
        } catch(err) {
            // setError(err.message)
            alert(err.message)
        }
    }

    useEffect(() => {
        if(user){
            navigate('/dashboard')
        }
    }, [])

    return(
        <>
            <h2>Firebase Auth Login</h2>
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
                <button type='submit' >Login</button>
            </form>
            <button onClick={() => navigate('/signup')} >Sign Up</button>
        </>
    )
}

export default Login