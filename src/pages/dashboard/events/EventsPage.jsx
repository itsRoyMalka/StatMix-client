import React, { useMemo} from 'react'

import axios from "axios";
import {Calendar} from "./Calendar";

import dayjs from "dayjs";





export const EventsPage = () => {


    const getEventsFromServer = async () =>{


        const events = await axios.get('/api/user/get-user-events')
            .catch(error=>{
                console.log(error)

            })

        const eventsMap = new Map();

        await events?.data?.forEach(event=> {

            const day = dayjs(event?.date).date()-1
            const month = dayjs(event?.date).month()+1
            const key = `${day}-${month}`

            const prevArray = eventsMap.get(key)

            if(!prevArray){
                eventsMap.set(key, [event])
            }else{
                prevArray.push(event)

            }
        })

        return eventsMap

    }

    const events = useMemo(()=> getEventsFromServer())


    return (

        <>



            <main className="lg:py-8 lg:px-16 px-4 flex-1 overflow-y-auto">

                <section aria-labelledby="primary-heading" className="min-w-0 flex-1 h-full flex flex-col lg:order-last">

                        <Calendar events={events} />



                </section>
            </main>
        </>


    )
}
