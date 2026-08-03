import React from 'react'

const YoutubeVideo = () => {
    return (
        <>
            <div className="container">
                <div className="row">
                    <iframe
                        width="560"
                        height="315"
                        src="https://www.youtube.com/embed/3H6Evu2hPpE?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&playsinline=1"
                        allow="autoplay; encrypted-media"
                        allowfullscreen
                        className='col-lg-6'>
                    </iframe>
                    <div className="ml-4 w-200 col-lg-5 justify-center flex items-start flex-col">
                        <p className="text-lg font-semibold">Welcome to Our Real Estate Platform</p>
                        <p className="text-gray-600 dark:text-gray-300">
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laboriosam, nesciunt quisquam accusamus nobis quasi aliquam provident earum doloremque voluptates cupiditate.
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default YoutubeVideo