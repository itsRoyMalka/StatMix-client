import React, {useContext, useEffect, useRef, useState} from 'react'

import {useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";
import axios from "axios";
import {UserContext} from "../../../context/UserContext";

export const Signout = () => {


    const navigate = useNavigate()
    const {setUser,ready, setReady} = useContext(UserContext)
    const [cookies, setCookie] = useCookies();

    const handleSignout = async () =>{

        await axios.post('/api/auth/signout')
            .then(res=>{
             cookies.remove('token')
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
            console.log(ready)
            navigate('/login')
        })
    },[])

    return (
        <h1>log out</h1>
    )
}
