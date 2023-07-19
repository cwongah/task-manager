import React from "react";
import { useUserAuth } from "../firebase/UserAuthContext";
import { useNavigate } from "react-router-dom";
import { BiLogOut } from 'react-icons/bi'
import { AiOutlineMenu } from 'react-icons/ai'

function Navbar({setSidebarToggle, setIsLogin}){
    const {logOut, user} = useUserAuth()
    const navigate = useNavigate()

    async function handleLogout(){
        try{
            await logOut()
            setIsLogin(false)
            setSidebarToggle(false)
            navigate('/')
        } catch(error){
            alert(error.message)
        }
    }

    return(
        !user ? null :
            <div className="py-3 bg-white bg-opacity-20 shadow-xl ">
                <div className="flex justify-between items-center">
                    {user ? 
                        <div className="flex items-center">
                            <div className="mr-auto ml-4">
                                <button onClick={() => setSidebarToggle(true)}>
                                    <AiOutlineMenu size={30} color="white "/>
                                </button>
                            </div>
                        </div>
                        :
                        null
                    }
                    <div className=" text-3xl text-white mx-auto drop-shadow-2xl">
                        Task Manager
                    </div>
                    {user ? 
                        <div className="flex items-center">
                            <div className="ml-auto mr-4">
                                <button onClick={handleLogout}>
                                    <BiLogOut size={30} color="white"/>
                                </button>
                            </div>
                        </div>
                        :
                        null
                    }
                </div>
            </div>
    )
}

export default Navbar