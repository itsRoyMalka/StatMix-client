import React, {useEffect, useMemo, useRef, useState} from 'react'
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    ClockIcon,
} from "@heroicons/react/24/solid";

import dayjs from "dayjs";
import {Dropdown} from "../../../components/buttons/Dropdown";
import {SideOverlay} from "./SideOverlay";
import {Spinner} from "../../../components/widgets/Spinner";



function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


export const Calendar = ({events}) => {


    const [isLoading, setIsLoading] = useState(false)
    const [selectedDay, setSelectedDay] = useState(null)
    const [eventSelected, setEventSelected] = useState(null)
    const [open, setOpen] = useState(false)
    const [formType, setFormType] = useState(true)


    const now = dayjs()
    const dateFormat = "MMM YYYY";

    const [currentMonth, setCurrentMonth] = useState(now)
    const [days, setDays] = useState([])


    const renderDays = async () =>{

        const newDays = []

        const dateFormat = "YYYY-MM-DD";

        const prevMonth = currentMonth.subtract(1, "month")
        const daysInPrevMonth = prevMonth.daysInMonth()
        const nextMonth = currentMonth.add(1, "month")

        const startOfMonth = currentMonth.startOf("month").day()
        const daysInCurrentMonth = currentMonth.daysInMonth()


        const eventsMap = await events


        for(let i=daysInPrevMonth-startOfMonth+1; i<=daysInPrevMonth; i++){

            const day = (prevMonth.date(i).date()+1).toString()
            const month = (currentMonth.month().toString())
            const key = `${day}-${month}`



            newDays.push({
                date: prevMonth.date(i).format(dateFormat),
                isCurrentMonth: false,
                isSelected: false,
                events: await eventsMap.get(key) || []
            })
        }

        for(let i=1; i<=daysInCurrentMonth; i++ ){


            const day = (currentMonth.date(i).date())
            const month = ((currentMonth.month()+1))
            const key = `${day}-${month}`

            newDays.push({
                date: currentMonth.date(i).format(dateFormat),
                isCurrentMonth: true,
                isToday: currentMonth.date(i).format(dateFormat) === now.format(dateFormat),
                isSelected: false,
                events: await eventsMap.get(key) || []
            })
        }

        const daysLeft = 42 - newDays.length

        for(let i=1; i<=daysLeft; i++ ){

            const day = (nextMonth.date(i).date()).toString()

            newDays.push({
                date: nextMonth.date(i).format(dateFormat),
                isCurrentMonth: false,
                isSelected: false,
                events:  []
            })
        }


        setDays(newDays)

    }


    useEffect(()=>{

        setIsLoading(true)
        renderDays()
            .then(res=>{
                setIsLoading(false)
            })
            .catch(error=>console.log(error))

    },[currentMonth])



    const handleNextMonth = () =>{

        const plus = currentMonth.add(1,"month");
        setCurrentMonth(plus);
    }

    const handlePrevMonth = () =>{

        const minus = currentMonth.subtract(1,"month");
        setCurrentMonth(minus);
    }

    const handleEventSelect = (event) =>{


        setEventSelected(event)

    }

    const handleDaySelect = (day) =>{
        setSelectedDay(day)
    }

    const handleAddEvent = (e) =>{

        setFormType(true)
        setOpen(true)

    }

    const handleViewEvent = async (e, event)=>{

        await setEventSelected(event)

        setFormType(false)
        setOpen(true)


    }


    return (

        <>
            <SideOverlay open={open} setOpen={setOpen} formType={formType} event={eventSelected}  />
            {isLoading ?
                (
                    <Spinner />
                )
                :(
                    <div className="lg:flex lg:h-full lg:flex-col">



                        <header className="relative z-10 flex items-center justify-between border-b border-gray-200 py-2 px-6 lg:flex-none">
                            <h1 className="text-lg font-semibold text-gray-900">
                                <time dateTime="2022-01">{currentMonth.format(dateFormat)} </time>
                            </h1>
                            <div className="flex items-center">
                                <div className="flex items-center rounded-md shadow-sm md:items-stretch">
                                    <button
                                        onClick={()=>handlePrevMonth()}
                                        type="button"
                                        className="flex items-center justify-center rounded-l-md border border-r-0 border-gray-300 bg-white py-2 pl-3 pr-4 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50"
                                    >
                                        <span className="sr-only">Previous month</span>
                                        <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                                    </button>
                                    <button
                                        onClick={()=>setCurrentMonth(now)}
                                        type="button"
                                        className="hidden border-t border-b border-gray-300 bg-white px-3.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 focus:relative md:block"
                                    >
                                        Today
                                    </button>
                                    <span className="relative -mx-px h-5 w-px bg-gray-300 md:hidden" />
                                    <button
                                        onClick={()=>handleNextMonth()}
                                        type="button"
                                        className="flex items-center justify-center rounded-r-md border border-l-0 border-gray-300 bg-white py-2 pl-4 pr-3 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50"
                                    >
                                        <span className="sr-only">Next month</span>
                                        <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                                    </button>
                                </div>
                                <div className="hidden md:ml-4 md:flex md:items-center">

                                    <div className="ml-6 h-6 w-px bg-gray-300" />
                                    <button
                                        onClick={()=>handleAddEvent()}
                                        type="button"
                                        className="focus:outline-none ml-6 rounded-md border border-transparent bg-sky-400 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-sky-500 focus:ring-2 focus:ring-sky-400 focus:ring-offset-2"
                                    >
                                        Add event
                                    </button>
                                </div>

                            </div>
                        </header>
                        <div className="shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col">
                            <div className="grid grid-cols-7 gap-px border-b border-gray-300 bg-gray-200 text-center text-xs font-semibold leading-6 text-gray-700 lg:flex-none">
                                <div className="bg-white py-2">
                                    S<span className="sr-only sm:not-sr-only">un</span>
                                </div>
                                <div className="bg-white py-2">
                                    M<span className="sr-only sm:not-sr-only">on</span>
                                </div>
                                <div className="bg-white py-2">
                                    T<span className="sr-only sm:not-sr-only">ue</span>
                                </div>
                                <div className="bg-white py-2">
                                    W<span className="sr-only sm:not-sr-only">ed</span>
                                </div>
                                <div className="bg-white py-2">
                                    T<span className="sr-only sm:not-sr-only">hu</span>
                                </div>
                                <div className="bg-white py-2">
                                    F<span className="sr-only sm:not-sr-only">ri</span>
                                </div>
                                <div className="bg-white py-2">
                                    S<span className="sr-only sm:not-sr-only">at</span>
                                </div>

                            </div>
                            <div className="flex bg-gray-200 text-xs leading-6 text-gray-700 lg:flex-auto">
                                <div className="hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-6 lg:gap-px">
                                    {days.map((day) => (
                                        <div
                                            key={day.date}
                                            className={classNames(
                                                day.isCurrentMonth ? 'bg-white' : 'bg-gray-50 text-gray-500',
                                                'relative py-2 px-3'
                                            )}
                                        >

                                            <time
                                                dateTime={day.date}
                                                className={
                                                    day.isToday
                                                        ? 'flex h-6 w-6 items-center justify-center rounded-full bg-sky-400 font-semibold text-white'
                                                        : undefined
                                                }
                                            >
                                                {day.date.split('-').pop().replace(/^0/, '')}
                                            </time>
                                            {day.events.length > 0 && (
                                                <ol className="mt-2">
                                                    {day.events?.slice(0, 2).map((event, eventIdx) => (
                                                        <li key={eventIdx}>
                                                            <a  onClick={(e)=>{
                                                                handleEventSelect(e)
                                                                handleViewEvent(e, event)
                                                            }}
                                                                className="group flex cursor-pointer">
                                                                <p className="flex-auto truncate font-medium text-gray-900 group-hover:text-sky-400">
                                                                    {event.name}


                                                                </p>
                                                                <time
                                                                    dateTime={event.date}
                                                                    className="ml-3 hidden flex-none text-gray-500 group-hover:text-sky-400 xl:block"
                                                                >

                                                                    {event.date.slice(11,16)}
                                                                </time>
                                                            </a>
                                                        </li>
                                                    ))}
                                                    <div  className='flex cursor-pointer '>

                                                        <Dropdown buttons={day.events} title= {day.events?.length > 2 && <li className="text-gray-500 hover:text-sky-400 ">+ {day.events?.length - 2} more</li>} handler={handleViewEvent}/>
                                                    </div>

                                                </ol>
                                            )}
                                        </div>
                                    ))}
                                </div>



                                {/* MOBILE */}


                                <div className="isolate grid w-full grid-cols-7 grid-rows-6 gap-px lg:hidden">
                                    {days?.map((day) => (
                                        <button
                                            onClick={()=>handleDaySelect(day)}
                                            key={day.date}
                                            type="button"
                                            className={classNames(
                                                day.isCurrentMonth ? 'bg-white' : 'bg-gray-50',
                                                (day.isSelected || day.isToday) && 'font-semibold',
                                                day.isSelected && 'text-white',
                                                !day.isSelected && day.isToday && 'text-sky-400',
                                                !day.isSelected && day.isCurrentMonth && !day.isToday && 'text-gray-900',
                                                !day.isSelected && !day.isCurrentMonth && !day.isToday && 'text-gray-500',
                                                'flex h-14 flex-col py-2 px-3 hover:bg-gray-100 focus:z-10'
                                            )}
                                        >
                                            <time
                                                dateTime={day.date}
                                                className={classNames(
                                                    day.isSelected && 'flex h-6 w-6 items-center justify-center rounded-full',
                                                    day.isSelected && day.isToday && 'bg-sky-400',
                                                    day.isSelected && !day.isToday && 'bg-gray-900',
                                                    'ml-auto'
                                                )}
                                            >
                                                {day?.date?.split('-').pop().replace(/^0/, '')}
                                            </time>
                                            <p className="sr-only">{day?.events?.length} events</p>
                                            {day?.events?.length > 0 && (
                                                <div className="-mx-0.5 mt-auto flex flex-wrap-reverse">
                                                    {day?.events?.map((event) => (
                                                        <div onClick={(e)=>{
                                                            handleEventSelect(event)
                                                            handleViewEvent(e, event)
                                                        }}
                                                             key={event.name}
                                                             className="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400" />
                                                    ))}
                                                </div>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>

                        </div>
                        <div className="lg:hidden mt-3 flex-col items-center text-center">
                            <button
                                onClick={()=>handleAddEvent()}
                                type="button"
                                className="w-full focus:outline-none  rounded-md border border-transparent bg-sky-400 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-sky-500 focus:ring-2 focus:ring-sky-400 focus:ring-offset-2"
                            >
                                Add event
                            </button>
                        </div>

                        {selectedDay?.events?.length > 0 && (
                            <div className="py-4 px-3 sm:px-6 lg:hidden">
                                <ol className="divide-y divide-gray-100 overflow-hidden rounded-lg bg-white text-sm shadow ring-1 ring-black ring-opacity-5">
                                    {selectedDay?.events?.map((event) => (
                                        <li key={event._id} className="group flex p-4 pr-6 focus-within:bg-gray-50 hover:bg-gray-50">
                                            <div className="flex-auto">
                                                <p className="font-semibold text-gray-900">{event.name}</p>
                                                <time dateTime={event.datetime} className="mt-2 flex items-center text-gray-700">
                                                    <ClockIcon className="mr-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                                                    {event.date.slice(11,16)}
                                                </time>
                                            </div>
                                            <a
                                                onClick={(e)=>{
                                                    handleEventSelect(e)
                                                    handleViewEvent(e,event)
                                                }}
                                                className="ml-6 flex-none self-center rounded-md border border-gray-300 bg-white py-2 px-3 font-semibold text-gray-700 opacity-0 shadow-sm hover:bg-gray-50 focus:opacity-100 group-hover:opacity-100"
                                            >
                                                Edit<span className="sr-only">, {event.name}</span>
                                            </a>
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        )}
                    </div>
                    )}


        </>



    )
}
