import React, { useEffect , useState } from 'react';
import homepicture2 from "../../media/homepicture2.svg"
import homepicture1 from "../../media/homepicture1.svg"
import homepicture3 from "../../media/homepicture3.svg"
import homepicture4 from "../../media/homepicture4.svg"
import homepicture5 from "../../media/homepicture5.svg"
import cl from "../Home/home.module.css"
import { useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { useSelector } from 'react-redux';
import { setIsOpen } from '../../store';
import { useDispatch } from 'react-redux';
import Deck from '../../components/Deck/Deck';




const Home = () => {
    const dispatch = useDispatch()
    const isAuth = useSelector(state => state.prodAuth.isAuth)
    const navigate = useNavigate()

    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.2,
    });
    const [ref2, inView2] = useInView({
        triggerOnce: true,
        threshold: 0.3, 
    });
    const [ref3, inView3] = useInView({
        triggerOnce: true, 
        threshold: 0.1, 
    });

      

    return(
        <section class="text-white bg-gray-900 dark:[color-scheme:dark] min-h-screen pb-[100px] max-w-full overflow-hidden">
            <div class="container mx-auto flex px-5 lg:pt-32 pt-10 lg:flex-row flex-col items-end lg:mb-[18rem] mb-12">
                <div class="h-[384px] lg:w-[55%] lg:pr-24 flex flex-col lg:items-start md:text-left items-center text-center lg:mb-8">
                <div class=" lg:text-[5rem] leading-[5.313rem] font-bold  text-white lg:h-[12.75rem] lg:w-[37.5rem] text-3xl">
                Find best tattoo designs
                </div>
                <p class="mb-4 leading-relaxed lg:text-[1.238rem] text-[1.05rem] lg:h-[6.563rem] lg:w-[37.688rem] font-normal">
                Imagine a place where you can find any tattoo you can think of. A place where you can create most creative tattoo with out any design knowledge ...
                </p>
                <div class="flex justify-center">
                <button onClick={()=>navigate("/catalog")}
                className="text-white lg:text-[1.438rem] leading-relaxed bg-green-500 border-0 py-2 px-4 md:px-1 sm:px-1 focus:outline-none hover:bg-green-600 rounded text-[1.05rem] lg:w-[11.2rem] lg:h-[3.063rem] flex items-center">
                Start Browsing
                </button>
                </div>
                </div>
                <div class="flex lg:justify-end md:justify-center w-full ">
                        <img class="object-cover object-center rounded" alt="hero" src={homepicture2}></img>
                </div>
            </div>
            {/* white section */}
            <div class='flex justify-center w-full bg-white lg:h-[41.688rem] px-5'>
            <div class={`container mx-auto flex px-5 lg:flex-row flex-col items-center ${cl.hidden} ${inView ? cl.showed : ""}`} ref={ref}>
                <div class="flex justify-start w-full items-center h-full">
                        <img  className='lg:max-h-[467.99px] lg:max-w-[600px] max-h-[273px] max-w-[350px]' alt="hero" src={homepicture1}></img>
                </div>
                <div class="h-[384px] lg:w-[55%] lg:pl-24 flex flex-col lg:items-start md:text-left items-center text-center lg:mb-8 ">
                <div class="lg:text-[4.688rem] lg:leading-[5.313rem] leading-10 mb-4 lg:mb-0 font-bold lg:h-[12.375rem] lg:w-[43.625rem] text-3xl text-gray-900">
                Design generator powered by AI
                </div>
                <p class="mb-4 leading-relaxed lg:text-[1.238rem] text-[1.05rem] lg:h-[6.563rem] lg:w-[37.688rem] font-normal text-gray-900">
                We are currently offering tool to create tattoo designs that will include anything you type in prompt field so you only limited by you imaginations. <a className='text-green-500 cursor-pointer ' onClick={()=>{ if(isAuth){navigate("/catalog")}else{dispatch(setIsOpen(true))} }} >Go and try it !</a>
                </p>
                <div class="flex justify-center">
                </div>
                </div>
            </div>
            </div>
            {/* dark section 2*/}
            <div className="w-full lg:h-[60.5rem] bg-gray-900" ref={ref2}>
            <div className={`w-full h-full flex flex-col lg:flex-row lg:justify-start justify-center lg:pt-0 pt-12 ${cl.hidden2} ${inView2 ? cl.showed : ""}`}>
            <div className='lg:h-full lg:w-10/12 flex flex-col justify-center lg:mb-0 mb-8'>
            <div class="flex lg:justify-end justify-center w-full items-end lg:h-1/2 ">
                <div class="lg:h-[18.063rem] lg:w-[43.625rem] w-full lg:pr-24 flex flex-col lg:items-start md:text-left  items-center text-center lg:mb-8" >
                    <div class=" lg:text-[4.688rem] lg:leading-[5.313rem] leading-10 mb-4 lg:mb-0 font-bold  text-white lg:h-[12.75rem] lg:w-[43.625rem] text-3xl">
                    Check out designs from other users 
                    </div>
                    <p class="mb-4 leading-relaxed lg:text-[1.238rem] text-[1.05rem] lg:h-[6.563rem] lg:w-[37.688rem] font-normal lg:px-0 px-10">
                    Not interested in creating designs? Then choose something made by our creative users in <a className='text-green-500 cursor-pointer ' onClick={()=>navigate("/catalog")} >collection !</a>
                    </p>
                    <div class="flex justify-center">
                    </div>
                </div>
            </div>
            <div class="flex lg:justify-center md:justify-center w-full items-center lg:h-1/2 h-0 lg:scale-100 scale-0">
               {/* <img  className='max-h-[433.61px] max-w-[600px]' alt="hero" src={homepicture4}></img> */}
               <Deck/>
            </div>
            </div>
            <div className='h-full w-full'>
                <div class="flex justify-center w-full items-end h-full">
                <img  className='lg:max-h-[823.34px] lg:max-w-[700px] max-h-[458.72px] max-w-[390px]' alt="hero" src={homepicture3}></img>
                </div>
            </div>
            </div>  
            </div>
            {/* white section 2*/}
            <div className='flex justify-center w-full bg-white lg:h-[41.688rem] px-5 lg:mb-0 mb-20'>
            <div class={`container mx-auto flex px-5 lg:flex-row flex-col items-center ${cl.hidden} ${inView3 ? cl.showed : ""}`} ref={ref3}>
                <div class="flex lg:justify-start md:justify-center w-full items-center h-full">
                        <img  className='max-h-[467.99px] max-w-[600px]' alt="hero" src={homepicture5}></img>
                </div>

                <div class="h-[384px] lg:w-[55%] lg:pl-24 flex flex-col lg:items-start md:text-left items-center text-center lg:mb-8 ">
                <div class="lg:text-[4.688rem] lg:leading-[5.313rem] leading-10 mb-4 lg:mb-0 font-bold lg:h-[12.375rem] lg:w-[43.625rem] text-3xl text-gray-900">
                Experiments are free after signup !
                </div>
                <p class="mb-4 leading-relaxed lg:text-[1.238rem] text-[1.05rem] lg:h-[6.563rem] lg:w-[37.688rem] font-normal text-gray-900">
                For now project in its early version so we are giving you full access for free. We hope that this will help us to fix as mush issues as possible, so we would appreciate if you report every bug/problem you faced with while using our website.
                 <a className='text-green-500 cursor-pointer ' href="https://t.me/sashazhov" target="_blank"> Help the project!</a>
                </p>
                <div class="flex justify-center">
                </div>
                </div>
            </div>
            </div>
        </section>
    )
};

export default Home;