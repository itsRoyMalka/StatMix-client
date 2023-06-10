import React, {Fragment, useContext, useState} from 'react'
import {Bars3Icon} from "@heroicons/react/24/outline";
import {MagnifyingGlassIcon} from "@heroicons/react/24/solid";
import {Menu, Transition} from "@headlessui/react";
import {UserContext} from "../../../context/UserContext";
import {useNavigate} from "react-router-dom";




export const DashTopbar = ({classNames, setMobileMenuOpen, userNavigation}) => {

    const {user} = useContext(UserContext)
    const [params,setParams] = useState()
    const navigate = useNavigate()

const handleSearch = (e) =>{
        e.preventDefault()
    navigate(`/dashboard/search?q=${params}`)
}

    return (
        <header className="w-full">

            <div className="relative z-20 flex-shrink-0 h-16 bg-white border-b border-gray-200 shadow-sm flex">
                <button
                    type="button"
                    className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sky-400 md:hidden"
                    onClick={() => setMobileMenuOpen(true)}
                >
                    <span className="sr-only">Open sidebar</span>
                    <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </button>

                <div className="flex-1 flex justify-between px-4 sm:px-6">
                    <div className="flex-1 flex">
                        <form className="w-full flex md:ml-0" onSubmit={(e)=>handleSearch(e)}>
                            <label htmlFor="search-field" className="sr-only">
                                Search all files
                            </label>
                            <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
                                    <MagnifyingGlassIcon className="flex-shrink-0 h-5 w-5" aria-hidden="true" />
                                </div>
                                <input
                                    onChange={(e)=>setParams(e.target.value)}

                                    name="text"
                                    id="text"
                                    className="h-full w-full border-transparent py-2 pl-8 pr-3 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent focus:placeholder-gray-400"
                                    placeholder="Search event..."
                                    type="text"
                                />
                            </div>
                        </form>

                    </div>

                    <div className="ml-2 flex items-center space-x-4 sm:ml-6 sm:space-x-6">

                        {/* Profile dropdown */}
                        <Menu as="div" className="relative flex-shrink-0">
                            <div>
                                <Menu.Button className="bg-white border border-gray-400 rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-400">
                                    <span className="sr-only">Open user menu</span>

                                    <img
                                        className="h-9 w-9 rounded-full"
                                        src={user?.imageUrl?
                                            (
                                                user.imageUrl
                                            )
                                            :
                                            (
                                               'https://eitrawmaterials.eu/wp-content/uploads/2016/09/person-icon.png'
                                            )}
                                        alt=""
                                    />
                                </Menu.Button>
                            </div>
                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">

                                    {userNavigation.map(item =>{
                                                return <Menu.Item key={item.name}>
                                                    {({ active }) => (
                                                        <a
                                                            href={item.href}
                                                            className={classNames(
                                                                active ? 'bg-gray-100' : '',
                                                                'block px-4 py-2 text-sm text-gray-700'
                                                            )}
                                                        >
                                                            {item.name}
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                            })}




                                </Menu.Items>
                            </Transition>
                        </Menu>


                    </div>
                </div>
            </div>
        </header>
    )
}
