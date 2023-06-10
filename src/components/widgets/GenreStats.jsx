import React from 'react'



export const GenreStats = ({genres, title, showAll}) => {
    return (
        <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">{title}</h3>

            <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {genres.map((genre) => (
                    <div
                        key={genre.name}
                        className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden"
                    >
                        <dt>

                                <img className="mt-2 mx-auto h-24 w-24 rounded-2xl lg:w-32 lg:h-32 " src={genre.imageUrl} alt="" />

                            <p className="text-center text-sm font-medium text-gray-500 truncate">{genre.name}</p>
                            <p className="text-center text-4xl font-semibold text-gray-900">{genre.totalVotes} </p>
                            <p className="text-center text-md font-medium text-gray-900 truncate"> Total Votes</p>

                        </dt>
                        {showAll &&
                            <dd className="text-center pb-6 flex items-baseline sm:pb-7">
                                <div className="absolute bottom-0 inset-x-0 bg-gray-50 px-4 py-4 sm:px-6">
                                    <div className="text-sm">
                                        <a href="/dashboard/genres" className="font-medium text-sky-400 hover:text-sky-500">
                                            {' '}
                                            View all<span className="sr-only"> {genre.name} stats</span>
                                        </a>
                                    </div>
                                </div>
                            </dd>
                        }

                    </div>
                ))}
            </dl>
        </div>
    )
}
