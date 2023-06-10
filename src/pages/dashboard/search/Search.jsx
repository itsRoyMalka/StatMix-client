import React, {useEffect, useState} from 'react'
import {useNavigate, useSearchParams} from "react-router-dom";
import axios from "axios";
import {Spinner} from "../../../components/widgets/Spinner";
import {SideOverlay} from "../events/SideOverlay";

export const Search = () => {

    const [searchParams, setSearchParams] = useSearchParams();

    const [events, setEvents] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const params = searchParams.toString().replace(/\s/g, '+').slice(2,searchParams.length)

    const [open,setOpen] = useState(false)
    const [eventSelected, setEventSelected] = useState(null)


    useEffect(()=>{
        axios.post('/api/user/search-event', {params})
            .then(res=>{
                setEvents(res.data)
            })
            .catch(error=>{
                console.log(error)
            })
    },[])

    const handleViewEvent = async (e, event)=>{

        await setEventSelected(event)


        setOpen(true)


    }


    return (
        <main className="lg:py-8 lg:px-16 px-4 flex-1 overflow-y-auto">

            <section aria-labelledby="primary-heading" className="min-w-0 flex-1 h-full flex flex-col lg:order-last">
                {isLoading?
                    (
                        <Spinner />
                    )
                    :(

                        <>



                            <SideOverlay open={open} setOpen={setOpen} formType={false} event={eventSelected}  />

                            {events?.length > 0 &&
                                <div className="px-4 sm:px-6 lg:px-8">
                                    <div className="sm:flex sm:items-center">
                                        <div className="sm:flex-auto">
                                            <h1 className="text-xl font-semibold text-gray-900">Events </h1>
                                            <p className="mt-2 text-sm text-gray-700">
                                                {params}
                                            </p>
                                        </div>

                                    </div>
                                    <div className="mt-8 flex flex-col">
                                        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
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
                                                            <th scope="col" className="sr-only px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                                Edit
                                                            </th>
                                                            <th scope="col" className="sr-only px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                                Event Page
                                                            </th>
                                                            <th scope="col" className="sr-only px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                                Event Live Page
                                                            </th>



                                                        </tr>
                                                        </thead>
                                                        <tbody className="divide-y divide-gray-200 bg-white">
                                                        {events?.map((event) => (
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


                                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                                            <a onClick={(e)=>{handleViewEvent(e,event)}}
                                                                               className="text-sky-400 hover:text-sky-500 cursor-pointer">
                                                                                Edit </a>

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
                                <div>No events found</div>
                            }
            </>)}

            </section>

        </main>
    )
}
