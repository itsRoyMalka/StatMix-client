/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/24/solid'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}



export const Dropdown = ({buttons, title, handler}) => {



    return (
            <Menu as="div" className="relative z-30 inline-block text-left">
            <div>
                <Menu.Button className="">
                    <span className="sr-only">Open options</span>
                    {title}
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
                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">

                        {buttons?.map((button, idx)=>{
                            return <Menu.Item key={idx}>
                                {({ active }) => (
                                    <a
                                        key={button._id}
                                        onClick={(e)=>handler(e,button)}
                                        className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'flex block px-4 py-2 text-sm'
                                        )}
                                    >
                                        {button.name} <p className="ml-16">{button?.date?.slice(11,16)}</p>
                                    </a>
                                )}
                            </Menu.Item>

                        })}





                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}
