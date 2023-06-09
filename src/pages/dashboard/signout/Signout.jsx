import React, {useContext, useEffect, useRef, useState} from 'react'

import {useNavigate} from "react-router-dom";

import axios from "axios";
import {UserContext} from "../../../context/UserContext";

export const Signout = () => {


    const navigate = useNavigate()
    const {setUser} = useContext(UserContext)

    const handleSignout = async () =>{

        await axios.post('/api/auth/signout')
            .then(res=>{
                setUser(null)
            })
            .catch(error=>{
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
