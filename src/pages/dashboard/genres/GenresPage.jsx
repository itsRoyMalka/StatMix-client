import React, {useEffect, useState} from 'react'
import {SideOverlay} from "./SideOverlay"
import axios from "axios";
import {Spinner} from "../../../components/widgets/Spinner";




export const GenresPage = () => {

    const [open, setOpen] = useState(false)
    const [formType, setFormType] = useState(true)
    const [genre, setGenre] = useState({})
    const [genres, setGenres] = useState([])
    const [isLoading, setIsLoading] = useState(false)


    useEffect(()=>{

        setIsLoading(true)

        axios.get('/api/user/get-user-genres')
            .then(res=>{

                setGenres(res.data)
                setIsLoading(false)

            })
            .catch(error=>{
                console.log(error)
            })



    },[])


    const handleAdd = () =>{

        setOpen(true)
        setFormType(true)
    }

    const handleView = (e, gen) =>{

        setGenre(gen)
        setOpen(true)
        setFormType(false)

    }


    return (

        <>
            <SideOverlay open={open} setOpen={setOpen} formType={formType} genre={genre}   />

            <main className="lg:py-8 lg:px-16 px-4 flex-1 overflow-y-auto">
                <section aria-labelledby="primary-heading" className="min-w-0 flex-1 h-full flex flex-col lg:order-last">

            {isLoading ?
                (
                    <Spinner />
                )
                :(


                            <div className="px-4 sm:px-6 lg:px-8">
                                <div className="sm:flex sm:items-center">
                                    <div className="sm:flex-auto">
                                        <h1 className="text-xl font-semibold text-gray-900">Genres</h1>
                                        <p className="mt-2 text-sm text-gray-700">
                                            active genres will be displayed to your audience
                                        </p>
                                    </div>
                                    <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                                        <button
                                            onClick={()=>handleAdd()}
                                            type="button"
                                            className="inline-flex items-center justify-center rounded-md border border-transparent bg-sky-400 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 sm:w-auto"
                                        >
                                            Add Genre
                                        </button>
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
                                                            Status
                                                        </th>
                                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                            Total votes
                                                        </th>
                                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                            Options
                                                        </th>

                                                    </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-200 bg-white">
                                                    {genres.map((gen) => (
                                                        <tr key={gen.name}>
                                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                                                                <div className="flex items-center">
                                                                    <div className="h-10 w-10 flex-shrink-0">
                                                                        <img className="h-10 w-10 rounded-full" src={gen.imageUrl} alt="" />
                                                                    </div>
                                                                    <div className="ml-4">
                                                                        <div className="font-medium text-gray-900">{gen.name}</div>
                                                                        <div className="text-gray-500">{gen.description}</div>
                                                                    </div>
                                                                </div>
                                                            </td>


                                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                                {gen.isActive ?
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
                                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                                                                <div className="flex items-center">
                                                                    <div className="ml-4">
                                                                        <div className="font-medium text-gray-900">{gen.totalVotes}</div>

                                                                    </div>
                                                                </div>
                                                            </td>

                                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                                <a onClick={(e)=> handleView(e, gen)}
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

                )}

                </section>
            </main>

        </>
    )
}
