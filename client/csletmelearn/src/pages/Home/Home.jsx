import React from 'react';
import homepicture2 from "../../media/homepicture2.svg"
import cl from "../Home/home.module.css"



const Home = () => {
    return(
        <section class="text-white bg-gray-900 dark:[color-scheme:dark] min-h-screen">
            <div class="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
                <div class="lg:w-3/6 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center lg:pl-12">
                <div class=" mb-3 lg:text-6xl md:text-4xl sm:text-3xl font-bold  text-white">
                    Find best tattoo design for yoursefl
                </div>
                <p class="mb-4 leading-relaxed">
                    Use power of modern technology provided by OpenAI to create unique desing or pick one made by other users
                </p>
                <div class="flex justify-center">
                <button 
                className="text-white bg-green-500 border-0 py-2 lg:px-4 md:px-2 sm:px-1 focus:outline-none hover:bg-green-600 rounded text-lg lg:h-2/5 flex items-center">
                    Get started
                </button>
                </div>
                </div>
                <div class="flex lg:justify-end sm:justify-center w-full ">
                    <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 flex lg:justify-end">
                        <img class="object-cover object-center rounded" alt="hero" src={homepicture2}></img>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default Home;