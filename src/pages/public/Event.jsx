/* This example requires Tailwind CSS v2.0+ */
import React, {useEffect, useState} from 'react'
import axios from "axios";
import {useParams} from "react-router-dom";
import {useCookies} from "react-cookie";
import {Spinner} from "../../components/widgets/Spinner";



function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export const Event = () => {

    const [event, setEvent] = useState({})
    const [pickedGenres, setPickedGenres] = useState([])
    const [isActive, setIsActive] = useState(false)
    const [cookies, setCookie] = useCookies();
    const [isLoading, setIsLoading] = useState(true)
    const {eventId} = useParams()



    const getEvent = () =>{

        setIsLoading(true)
        axios.get(`/api/public/get-event/${eventId}`)
            .then(res=>{


                setEvent(res.data)
                setIsActive(res.data.isActive)
                setIsLoading(false)

            })
            .catch(error=>{
                console.log(error)
                setIsLoading(false)

            })

    }

    const handlePick = (genre) =>{

        if(pickedGenres.includes(genre.name)){
            const arr = pickedGenres.filter(gen => gen !== genre.name)
            setPickedGenres(arr)
        }else{
            setPickedGenres([...pickedGenres, genre.name])
        }

    }

    const handleSubmit = () =>{

        axios.post(`/api/public/post-event/${eventId}`,pickedGenres)
            .then(res=>{

            setCookie('vote', eventId, {sameSite: 'none', secure: true})
                window.location.reload(false);
                console.log(res)
            })
            .catch(error=>{
                console.log(error)
            })

    }

    useEffect(()=>{
        getEvent()
    },[])



    return (



        <>

            {isLoading ?
                (

                        <center><Spinner /></center>


                ):
                (
                    <div className="min-h-full">



                        <div className="bg-white border-b border-gray-200 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


                            <div className="flex justify-between h-16">
                                <div className="flex">
                                    <div className="flex-shrink-0 flex items-center">
                                        <img
                                            className=" h-8 w-auto"
                                            src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg"
                                            alt="Workflow"
                                        />
                                    </div>

                                </div>
                            </div>
                        </div>
                        {isActive ?
                            (


                                <div className="py-10">

                                    <main>
                                        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                                            {/* Replace with your content */}


                                            {(cookies.vote === eventId)?
                                                (
                                                    <h2 className="text-center text-3xl font-extrabold tracking-tight sm:text-4xl">Thanks for your vote</h2>
                                                ):
                                                (
                                                    <>
                                                        <div className=" px-4 py-8 sm:px-0">
                                                            <div className="space-y-8 sm:space-y-12">
                                                                <div className="space-y-5 sm:mx-auto sm:max-w-xl sm:space-y-4 lg:max-w-5xl">
                                                                    <h2 className="text-center text-3xl font-extrabold tracking-tight sm:text-4xl">{event.name}</h2>
                                                                    <div className=" flex justify-center gap-3">
                                                                        <p className="text-xl text-gray-500">
                                                                            {event?.date?.slice(0,10)}
                                                                        </p>
                                                                        <p className="text-xl text-gray-500">
                                                                            {event.location}
                                                                        </p>

                                                                    </div>
                                                                    <p className="text-center text-xl text-gray-500">
                                                                        {event.description}
                                                                    </p>
                                                                    <p className="text-center text-2xl text-gray-900">
                                                                        Pick you favorite genres
                                                                    </p>


                                                                </div>
                                                                <ul
                                                                    role="list"
                                                                    className="mx-auto grid grid-cols-2  gap-x-4 gap-y-8 sm:grid-cols-4 md:gap-x-6 lg:max-w-5xl lg:gap-x-8 lg:gap-y-12 xl:grid-cols-6"
                                                                >
                                                                    {event?.genres?.map((genre) => (
                                                                        <a key={genre.name} onClick={()=>handlePick(genre)} className={classNames
                                                                        (pickedGenres.includes(genre.name)?('bg-sky-100 border border-gray-100 '):('border border-gray-100 '), "rounded-2xl cursor-pointer" )}>
                                                                            <li key={genre.name}>
                                                                                <div className="space-y-4">
                                                                                    <img className="mt-2 mx-auto h-24 w-24 rounded-2xl lg:w-24 lg:h-24 " src={genre.imageUrl} alt="" />
                                                                                    <div className="space-y-2">
                                                                                        <div className="text-center text-xs font-medium lg:text-sm">
                                                                                            <h3>{genre.name}</h3>
                                                                                            {pickedGenres.includes(genre.name) ? (
                                                                                                <span className="inline-flex items-center rounded-md bg-sky-50 px-2 py-1 text-xs font-medium text-sky-400 ring-1 ring-inset ring-sky-400/10">
                                                                                                Picked
                                                                                                </span>

                                                                                            ) :(
                                                                                                <span className="inline-flex items-center rounded-md bg-white px-2 py-2 text-xs font-medium text-white ring-1 ring-inset ring-white">

                                                                                            </span>
                                                                                            )

                                                                                            }
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </li>
                                                                        </a>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        </div>
                                                        <div className="mt-6 flex items-center justify-center gap-x-6 sm:px-5">
                                                            <button
                                                                onClick={()=>handleSubmit()}
                                                                type="submit"
                                                                className="rounded-md w-64 bg-sky-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
                                                            >
                                                                Submit you picks
                                                            </button>
                                                        </div>
                                                    </>
                                                )}


                                        </div>
                                    </main>




                                </div>
                            ):
                            (
                                <h2 className="text-center text-3xl font-extrabold tracking-tight sm:text-4xl">Event is not active yet</h2>

                            )}


                    </div>
                )}


        </>



    )
}
