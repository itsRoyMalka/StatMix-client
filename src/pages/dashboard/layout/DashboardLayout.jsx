import React, {Fragment, useContext, useState} from 'react'
import { HomeIcon, CalendarDaysIcon, PresentationChartBarIcon, UsersIcon, WifiIcon} from "@heroicons/react/24/outline";
import {DashSideNav} from "./DashSideNav";
import {DashMobileNav} from "./DashMobileNav";
import {DashTopbar} from "./DashTopbar";
import {Outlet, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {Message} from "../../../components/modals/Message";
import {useCookies} from "react-cookie";
import {CircleStackIcon} from "@heroicons/react/20/solid";
import {UserContext} from "../../../context/UserContext";


const path = window.location.pathname


const sidebarNavigation = [
    { name: 'Home', href: '/dashboard', icon: HomeIcon, current: path === '/dashboard' },
    { name: 'Live', href: '/dashboard/live', icon: WifiIcon, current: path === '/dashboard/live/:eventId' },
    { name: 'Events', href: '/dashboard/events', icon: CalendarDaysIcon, current:  path === '/dashboard/events' },
    { name: 'Statistics', href: '/dashboard/statistics', icon: PresentationChartBarIcon, current:  path === '/dashboard/statistics' },
    { name: 'Genres', href: '/dashboard/genres', icon: CircleStackIcon, current:  path === '/dashboard/genres' },
    { name: 'Profile', href: '/dashboard/profile', icon: UsersIcon, current:  path === '/dashboard/profile' },

]

const userNavigation = [
    { name: 'Your Profile', href: '/dashboard/profile' },
    { name: 'Sign out', href: '/dashboard/signout' },
]
const publicUserNavigation = [
    { name: 'Login', href: '/login' },
    { name: 'Sign Up', href: '/signup' },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export const DashboardLayout = ({children}) => {

    const navigate = useNavigate()
    const {user, ready} = useContext(UserContext)
   const isMessageOpen = useSelector(state=> state.message.open)


    if(ready ){

        setTimeout(()=>{

            if(!user){
                navigate('/login')
            }

        },(1000))


    }

    //console.log(user)

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (

        <>



            {isMessageOpen &&
                <Message />
            }


            <div className="h-full flex">



                <DashSideNav classNames={classNames}
                             sidebarNavigation={sidebarNavigation}

                />
                <DashMobileNav classNames={classNames}
                               mobileMenuOpen={mobileMenuOpen}
                               setMobileMenuOpen={setMobileMenuOpen}
                               sidebarNavigation={sidebarNavigation}
                />



                <div className="flex-1 flex flex-col overflow-hidden">

                    <DashTopbar
                        classNames={classNames}
                        setMobileMenuOpen={setMobileMenuOpen}
                        userNavigation={userNavigation}
                        publicUserNavigation={publicUserNavigation}
                    />

                    {/* Main content */}
                    <div className="flex-1 flex items-stretch overflow-hidden">

                        <Outlet />
                    </div>


                </div>

            </div>


        </>

    )
}
