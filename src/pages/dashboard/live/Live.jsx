import React, {useEffect, useMemo, useState} from 'react'
import {PieColumnChart} from "../../../components/charts/PieColumnChart";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {Spinner} from "../../../components/widgets/Spinner";
import {setMessageOpen, setMessageTitle, setMessageType} from "../../../state/MessageSlice";
import {useDispatch} from "react-redux";




export const Live = () => {

    const [isActive, setIsActive] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [chartType, setChartType] = useState('column')
    const [title, setTitle] = useState('')
    const {eventId} = useParams()

    const dispatch = useDispatch()


    const setNotification = async (type, title) =>{

        await dispatch(setMessageType(type))
        await dispatch(setMessageTitle(title))
        await dispatch(setMessageOpen(true, true))

    }



    const optionsSet = {
        animationEnabled: true,
        exportEnabled: true,
        theme: "light1", // "light1", "dark1", "dark2"
        title:{
            text: ""
        },
        data: [{
            type: chartType,
            indexLabel: "{label}: {y}",
            startAngle: -90,
            dataPoints: [

            ]
        }]
    }

    const [options, setOptions] = useState(optionsSet)


    useEffect(()=>{
        setIsLoading(true)


        axios.get(`/api/user/get-user-event/${eventId}`)
            .then(res=>{


                setTitle(res.data.name)
                setIsActive(true)

                options.data.at(0).dataPoints = []
                options.data.at(0).type = chartType

                res.data.genres.forEach(genre =>{

                    options.data.at(0).dataPoints.push({
                        y: genre.counter,
                        label: (chartType === 'column'? (genre.name.slice(0,10)): (genre.name))
                    })
                })


                setIsLoading(false)
            })
            .catch(error=>{
                console.log(error)


                    setIsActive(false)
                    setIsLoading(false)



            })

    },[chartType] )

    const handleEventStatus = ()=>{

        axios.patch(`/api/user/set-event-status/${eventId}`)
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



    return (


        <main className="relative z-10 mt-5 lg:py-8 lg:px-16 px-4 flex-1 overflow-y-auto">
            <section aria-labelledby="primary-heading" className="min-w-0 flex-1 h-full flex flex-col lg:order-last">



                {isLoading ?
                    (
                       <Spinner  />
                    )
                        : (

                        isActive ?
                                (
                                    <div className="">
                                        <h2 className="text-center text-3xl font-extrabold tracking-tight sm:text-4xl">{title}</h2>


                                        <div className="px-6 py-6 flex items-center justify-center gap-x-6">


                                            <button
                                                onClick={()=>setChartType('column')}
                                                type="submit"
                                                className="rounded-md w-32 bg-sky-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
                                            >
                                                Column chart
                                            </button>

                                            <button
                                                onClick={()=>setChartType('pie')}
                                                type="submit"
                                                className="rounded-md w-32 bg-sky-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
                                            >
                                                Pie chart
                                            </button>
                                        </div>
                                        <PieColumnChart options={options} />
                                    </div>

                                ):
                                    (
                                        <>
                                            <h2 className="text-center text-3xl font-extrabold tracking-tight sm:text-4xl">Event not Active</h2>
                                            <div className="px-6 py-6 flex items-center justify-center gap-x-6">
                                            <button
                                                onClick={()=>handleEventStatus()}
                                                type="submit"
                                                className="text-center rounded-md w-32 bg-sky-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
                                            >
                                                Activate
                                            </button>
                                            </div>
                                        </>


                                        )



                        )}


            </section>
        </main>
    )
}
