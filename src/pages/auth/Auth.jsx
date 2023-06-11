import React, {useContext, useEffect, useState} from 'react'

import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {UserContext} from "../../context/UserContext";
import {setMessageOpen, setMessageTitle, setMessageType} from "../../state/MessageSlice";
import {Message} from "../../components/modals/Message";
import {Spinner} from "../../components/widgets/Spinner";

export const Auth = ({type}) => {


    const navigate = useNavigate()
    const dispatch = useDispatch()


    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const {user,ready, setUser} = useContext(UserContext)
    const isMessageOpen = useSelector(state=> state.message.open)
    const [isLoading, setIsLoading] = useState(false)


    const setNotification = async (typeN, title) =>{

        await dispatch(setMessageType(typeN))
        await dispatch(setMessageTitle(title))
        await dispatch(setMessageOpen(true, true))

    }

    useEffect(()=>{

        if(type)
        axios.get('/api/user/get-user')
            .then(res=>{
                navigate('/dashboard')
            })
            .catch(error=>{

            })

    },[])





    const handleSubmit = async (e) => {
        e.preventDefault()

        setIsLoading(true)

        //type true - log in
        if (type) {
            if (email.length !== 0 && password.length !== 0) {
                await axios.post('/api/auth/login', {email, password}, )
                    .then(res => {

                        setUser(res.data.user)
                        //setCookie('token', res.data.token)


                        setNotification(true, "Logged in successfully")
                        setIsLoading(false)
                        setTimeout(() => {
                            navigate('/dashboard')
                        }, 1000)

                    })
                    .catch(error => {
                        console.log(error)
                        setIsLoading(false)
                        setNotification(false, `${error.message}`)


                    })

            } else {
                await setNotification(false, "Invalid input")
            }

        }


                //sign up
             else {



                if (email.length !== 0 && password.length !== 0 && firstName.length !== 0 && lastName.length !== 0) {
                    await axios.post('/api/auth/signup', {firstName, lastName, email, password, imageUrl})
                        .then(res => {
                            setNotification(true, "Signed up successfully")
                            setIsLoading(false)
                            setTimeout(() => {
                                navigate('/login')
                            }, 1000)
                        })
                        .catch(error => {
                            console.log(error)
                            setIsLoading(false)
                            setNotification(false, `${error.message}`)
                        })


                }else {
                    await setNotification(false, "Invalid input")

                }
            }
        setIsLoading(false)
        }





    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">

            {isMessageOpen &&
                <Message />
            }
            {isLoading &&
                <Spinner />
            }


            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    className="mx-auto h-10 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Your Company"
                />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    {type?
                        (
                           'Log in to your account'
                        )
                        : (
                            'Sign up your account'
                        )}
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" action="#" method="POST">

                    {!type &&
                    <>
                        <div>
                            <label htmlFor="text" className="block text-sm font-medium leading-6 text-gray-900">
                                First Name
                            </label>
                            <div className="mt-2">
                                <input
                                    onChange={(e)=>setFirstName(e.target.value)}
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    autoComplete="text"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-400 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="text" className="block text-sm font-medium leading-6 text-gray-900">
                                Last Name
                            </label>
                            <div className="mt-2">
                                <input
                                    onChange={(e)=>setLastName(e.target.value)}
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    autoComplete="text"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-400 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                    </>


                    }

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                onChange={(e)=>setEmail(e.target.value)}
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-400 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Password
                            </label>
                            {type &&
                                <div className="text-sm">
                                    <a href="/forgot-password" className="font-semibold text-sky-400 hover:text-sky-500">
                                        Forgot password?
                                    </a>
                                </div>
                            }

                        </div>
                        <div className="mt-2">
                            <input
                                onChange={(e)=>setPassword(e.target.value)}
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-400 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            onClick={(e)=>handleSubmit(e)}
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-sky-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
                        >
                            {type?
                                (
                                  'Sign in'
                                )
                                :(
                                    'Sign up'
                                )}

                        </button>
                    </div>
                </form>

                {type?
                    (
                        <p className="mt-10 text-center text-sm text-gray-500">
                            Not a member?{' '}
                            <a href="/signup" className="font-semibold leading-6 text-sky-400 hover:text-sky-400">
                                Sign up now
                            </a>
                        </p>
                    )
                    : (
                        <p className="mt-10 text-center text-sm text-gray-500">
                            Already a member?{' '}
                            <a href="/login" className="font-semibold leading-6 text-sky-400 hover:text-sky-400">
                                Log in now
                            </a>
                        </p>
                    )
                }


            </div>
        </div>
    )
}
