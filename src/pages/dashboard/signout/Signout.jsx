import React, {useContext, useEffect} from 'react'

import {useNavigate} from "react-router-dom";
import axios from "axios";
import {UserContext} from "../../../context/UserContext";

export const Signout = () => {


    const navigate = useNavigate()
    const {setUser,ready, setReady} = useContext(UserContext)

    const handleSignout = async () =>{

        await axios.post('/api/auth/signout')
            .then(res=>{
                setReady(false)
                setUser(null)

            })
            .catch(error=>{
                console.log("here")
                console.log(error)


            })


    }

    useEffect(()=>{
        handleSignout().then(res=>{

            navigate('/login')
        })
    },[])

    return (
        <h1>log out</h1>
    )
}
