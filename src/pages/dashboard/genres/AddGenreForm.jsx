import React, {useEffect, useState} from 'react'
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import dayjs from "dayjs";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {Toggle} from "../../../components/buttons/Toggle";
import {useDispatch, useSelector} from "react-redux";
import {setMessageOpen, setMessageTitle, setMessageType} from "../../../state/MessageSlice";



export const AddGenreForm = ({setOpen, formType, genre}) => {

    const dispatch = useDispatch()

    const [name, setName] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [description, setDescription] = useState('')
    const [isActive, setIsActive] = useState(true)

    const setNotification = async (type, title) =>{

        await dispatch(setMessageType(type))
        await dispatch(setMessageTitle(title))
        await dispatch(setMessageOpen(true, true))


    }

    useEffect(()=>{


        if(formType === false){

            setName(genre.name)
            setImageUrl(genre.imageUrl)
            setDescription(genre.description)
            setIsActive(genre.isActive)

        }

    },[])


    const handleSubmit = async (e) =>{
        e.preventDefault()


        if(formType){


            await axios.post('/api/user/add-genre',{name,imageUrl,description})
                .then(res=>{
                    console.log(res.status)
                    setOpen(false)
                    setNotification(true, "New genre added")

                    setTimeout(()=>{
                        window.location.reload(false);
                        },(3000))


                })
                .catch(error=>{
                    console.log(error)
                    setOpen(false)
                    setNotification(false, `${error.message}`)

                })

        }else{

            await axios.patch('/api/user/edit-genre',{prevName: genre.name,isActive, name, imageUrl, description})
                .then(res=>{
                    console.log(res.status)
                    setOpen(false)
                    setNotification(true, "Genre edited")
                    setTimeout(()=>{
                        window.location.reload(false);
                    },(3000))

                })
                .catch(error=>{
                    console.log(error)
                    setOpen(false)
                    setNotification(false, `${error.message}`)

                })
        }


    }

    const handleDelete = async (e)=>{
        e.preventDefault()

        await axios.delete(`/api/user/delete-genre/${genre.name}`)
            .then(res=>{
                console.log(res)
                setOpen(false)
                setNotification(true, "Genre deleted")
                setTimeout(()=>{
                    window.location.reload(false);
                },(3000))

            })
            .catch(error=>{
                console.log(error)
                setOpen(false)
                setNotification(false, `${error.message}`)

            })
    }





    return (
        <form>
            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">
                        {formType ?
                            (
                                'Add'
                            )
                            : (
                                'Edit'
                            )} Genre
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                        General information
                    </p>


                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-full">
                            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                Name
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-sky-400 sm:max-w-md">

                                    <input
                                        onChange={(e)=>setName(e.target.value)}
                                        type="text"
                                        name="name"
                                        id="name"
                                        autoComplete="name"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        value={name}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-full">
                                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                    Image Url
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-sky-400 sm:max-w-md">

                                        <input
                                            onChange={(e)=>setImageUrl(e.target.value)}
                                            type="text"
                                            name="name"
                                            id="name"
                                            autoComplete="name"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                            value={imageUrl}
                                        />
                                    </div>
                                </div>
                            </div>

                                <div className="col-span-full">
                            <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                                Description
                            </label>
                            <div className="mt-2">
                <textarea
                    onChange={(e)=>setDescription(e.target.value)}
                    id="about"
                    name="about"
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-400 sm:text-sm sm:leading-6"
                    defaultValue={description}
                />
                            </div>

                                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                        <div className="sm:col-span-full">
                                            <Toggle title={"Set active"}   enabled={isActive} setEnabled={setIsActive} />
                                        </div>
                                    </div>
                        </div>





                    </div>
                </div>




            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
                <button onClick={()=>setOpen(false)} type="button" className="text-sm font-semibold leading-6 text-gray-900">
                    Cancel
                </button>

                {!formType &&
                    <button
                        onClick={(e)=>handleDelete(e)}
                        type="submit"
                        className="rounded-md w-24 bg-red-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
                    >
                        Delete
                    </button>
                }

                <button
                    onClick={(e)=>handleSubmit(e)}
                    type="submit"
                    className="rounded-md w-24 bg-sky-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
                >
                    {formType ?
                        (
                            'Add'
                        ):
                        (
                            'Edit'
                        )}
                </button>
            </div>
        </form>
    )
}
