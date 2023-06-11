import React, {useEffect, useState} from 'react'
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {setMessageOpen, setMessageTitle, setMessageType} from "../../../state/MessageSlice";
import {useDispatch} from "react-redux";
import {Spinner} from "../../../components/widgets/Spinner";
import {Dropdown} from "../../../components/buttons/Dropdown";


const buttons = [
    {
        name: 'Name'
    },
    {
        name: 'Date'
    }
]

export const LiveRedirect = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [events, setEvents] = useState([])
    const [isLoading, setIsLoading] = useState(false)



    const setNotification = async (type, title) =>{

        await dispatch(setMessageType(type))
        await dispatch(setMessageTitle(title))
        await dispatch(setMessageOpen(true, true))

    }

    useEffect(()=>{

        setIsLoading(true)

        axios.get('/api/user/get-live-event')
            .then(res=>{

                setEvents(res.data)
                setIsLoading(false)
            })
            .catch(error=>{
                console.log(error)
                setIsLoading(false)

            })

    },[])

    const handleEventStatus = (e, event)=>{

        axios.patch(`/api/user/set-event-status/${event._id.toString()}`)
            .then(res=>{

                setNotification(true, "Status updated")

                setTimeout(()=>{
                    window.location.reload(false);
                },(2000))

            })
            .catch(error=>{
                console.log(error)
                setNotification(true, `${error.message}`)

                setTimeout(()=>{
                    window.location.reload(false);
                },(2000))
            })
    }


    /*
    const handleSort = async (e, button) =>{

        setIsLoading(true)
        e.preventDefault()


         if(button.name === 'Name'){

             const sorted = events.sort((a,b)=>{return b.name - a.name})

            setEvents(sorted)

        }else if(button.name === 'Date'){

            const sorted = events.sort((a,b)=>{return b.date - a.date})

            setEvents(sorted)
        }

        setIsLoading(false)



    }

     */

    return (
        <main className="lg:py-8 lg:px-16 px-4 flex-1 overflow-y-auto">
            <section aria-labelledby="primary-heading" className="min-w-0 flex-1 h-full flex flex-col lg:order-last">


            {isLoading?
                (
                    <Spinner />
                )
                :(

                    <>

                            {events?.length === 1 &&

                                navigate(`/dashboard/live/${events.at(0)._id.toString()}`)
                            }

                            {events?.length > 1 &&
                                <div className="px-4 sm:px-6 lg:px-8">
                                    <div className="sm:flex sm:items-center">
                                        <div className="sm:flex-auto">
                                            <h1 className="text-xl font-semibold text-gray-900">Live Events</h1>
                                            <p className="mt-2 text-sm text-gray-700">
                                                Please choose your event
                                            </p>
                                        </div>

                                    </div>
                                    <div className="mt-8 flex flex-col">
                                        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                                {/*
                                                 <div className="text-right">
                                                    <Dropdown title={<a
                                                        onClick={()=>{}}
                                                        type="button"
                                                        className=" h-8 w-24 focus:outline-none rounded-md border border-transparent bg-sky-400  text-sm font-medium text-white shadow-sm hover:bg-sky-500 focus:ring-2 focus:ring-sky-400 focus:ring-offset-2"
                                                    >
                                                        Sort by
                                                    </a>} buttons={buttons} handler={handleSort} />
                                                </div>

                                                */}


                                                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">

                                                    <table className="min-w-full divide-y divide-gray-300">

                                                        <thead className="bg-gray-50">
                                                        <tr>
                                                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                                                Name
                                                            </th>

                                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                                Date
                                                            </th>
                                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                                Location
                                                            </th>
                                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                                Status
                                                            </th>
                                                            <th scope="col" className=" px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                                Setting
                                                            </th>
                                                            <th scope="col" className=" px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                                Live
                                                            </th>



                                                        </tr>
                                                        </thead>
                                                        <tbody className="divide-y divide-gray-200 bg-white">
                                                        {events.map((event) => (
                                                            <tr key={event.name}>
                                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                                                                    <div className="flex items-center">

                                                                        <div className="">
                                                                            <div className="font-medium text-gray-900">{event.name}</div>
                                                                            <div className="text-gray-500">{event.description}</div>
                                                                        </div>
                                                                    </div>
                                                                </td>


                                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                                                                    <div className="flex items-center">
                                                                        <div className="">
                                                                            <div className="font-medium text-gray-900">{event.date.slice(0,10)}</div>

                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td className=" whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                                                                    <div className="flex items-center">
                                                                        <div className="">
                                                                            <div className="font-medium text-gray-900">{event.location}</div>

                                                                        </div>
                                                                    </div>
                                                                </td>

                                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                                    {event.isActive ?
                                                                        (
                                                                            <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                                        Active
                                        </span>
                                                                        ):
                                                                        (
                                                                            <span className="inline-flex rounded-full bg-red-100 px-2 text-xs font-semibold leading-5 text-red-800">
                                        Not Active
                                        </span>
                                                                        )}

                                                                </td>

                                                                {event.isActive ?

                                                                    (
                                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                                            <a onClick={(e)=>handleEventStatus(e,event)}
                                                                               className="text-red-400 hover:text-red-500 cursor-pointer">
                                                                                Turn off </a>

                                                                        </td>
                                                                    ):
                                                                    (
                                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                                            <a onClick={(e)=>handleEventStatus(e,event)}
                                                                               className="text-green-400 hover:text-green-500 cursor-pointer">
                                                                                Turn on </a>

                                                                        </td>
                                                                    )}


                                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                                    <a onClick={()=>{navigate(`/dashboard/live/${event._id.toString()}`)}}
                                                                       className="text-sky-400 hover:text-sky-500 cursor-pointer">
                                                                        Go to event </a>

                                                                </td>
                                                            </tr>
                                                        ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }

                            {events?.length === 0 &&
                                <div>you have no live events</div>
                            }
                    </>
                )}
            </section>

        </main>
    )

}
