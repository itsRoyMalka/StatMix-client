import React, {useEffect, useState} from 'react'
import axios from "axios";
import {GenreStats} from "../../../components/widgets/GenreStats";
import {Spinner} from "../../../components/widgets/Spinner";
import {PieColumnChart} from "../../../components/charts/PieColumnChart";

export const Statistics = () => {


    const [genres, setGenres] = useState([])

    const [topGenres, setTopGenres] = useState([])
    const [leastGenres, setLeastGenres] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [chartType, setChartType] = useState('column')

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
            dataPoints: []
        }]
    }

    const [options, setOptions] = useState(optionsSet)

    const renderChart = (genres) =>{

        options.data.at(0).dataPoints = []
        options.data.at(0).type = chartType

        genres.forEach(genre =>{

            options.data.at(0).dataPoints.push({
                y: genre.totalVotes,
                label: (chartType === 'column'? (genre.name.slice(0,10)): (genre.name))
            })
        })

    }


    useEffect(()=>{

        setIsLoading(true)

        axios.get('api/user/get-user-genres')
            .then(res=>{


                options.data.at(0).dataPoints = []
                options.data.at(0).type = chartType

                setGenres(res.data)
                renderChart(res.data)

                setTopGenres(res.data.sort((a,b)=>{return b.totalVotes - a.totalVotes }).slice(0,3))
                setLeastGenres(res.data.sort((a,b)=>{return a.totalVotes - b.totalVotes }).slice(0,3))

            })
            .catch(error=>{
                console.log(error)
            })

        setIsLoading(false)

    },[])

    useEffect(()=>{

        renderChart(genres)

    },[chartType])




    return (
        <main className="px-5 py-5 h-screen flex-1 overflow-y-auto">

            <section aria-labelledby="primary-heading" className="min-w-0 flex-1 h-full flex flex-col lg:order-last gap-5">


                {isLoading?
                    (
                       <Spinner />
                    ):
                    (
                        <>
                            <h3 className="text-lg leading-6 font-medium text-gray-900">All genres</h3>
                            <div className=" flex items-center justify-center gap-x-6">


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
                         <PieColumnChart options={options}  />
                        <GenreStats genres={topGenres} title={'Top Genres'} showAll={false} />
                        <GenreStats genres={leastGenres} title={'Least Genres'} showAll={false}/>
                        </>
                    )}


            </section>
        </main>

    )
}
