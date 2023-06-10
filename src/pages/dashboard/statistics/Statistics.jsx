import React, {useEffect, useState} from 'react'
import axios from "axios";
import {GenreStats} from "../../../components/widgets/GenreStats";
import {Spinner} from "../../../components/widgets/Spinner";

export const Statistics = () => {

    const [topGenres, setTopGenres] = useState([])
    const [leastGenres, setLeastGenres] = useState([])
    const [isLoading, setIsLoading] = useState(true)


    useEffect(()=>{

        setIsLoading(true)

        axios.get('api/user/get-user-genres')
            .then(res=>{
                setTopGenres(res.data.sort((a,b)=>{return b.totalVotes - a.totalVotes }).slice(0,3))
                setLeastGenres(res.data.sort((a,b)=>{return a.totalVotes - b.totalVotes }).slice(0,3))

            })
            .catch(error=>{
                console.log(error)
            })

        setIsLoading(false)

    },[])

    return (
        <main className=" px-5 py-5 flex-1 overflow-y-auto">

            <section aria-labelledby="primary-heading" className="min-w-0 flex-1 h-full flex flex-col lg:order-last gap-5">


                {isLoading?
                    (
                       <Spinner />
                    ):
                    (
                        <>
                        <GenreStats genres={topGenres} title={'Top Genres'} showAll={false} />
                        <GenreStats genres={leastGenres} title={'Least Genres'} showAll={false}/>
                        </>
                    )}


            </section>
        </main>

    )
}
