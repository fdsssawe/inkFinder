import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../store';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SignUpPopUp from './SignUpPopUp';
import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react';
import { setIsOpen } from '../store';
import {ArrowRightOnRectangleIcon , PhotoIcon , InformationCircleIcon , DocumentArrowUpIcon , CpuChipIcon} from "@heroicons/react/24/outline"



const Header = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isAuth = useSelector(state => state.prodAuth.isAuth)
    const isOpen = useSelector(state => state.prodAuth.isOpen)
    // const [isOpen , setIsOpen] = useState(false)
    const userId = useSelector(state => state.prodAuth.user.id);
    // md:w-fit md:scale-100 w-0 scale-0
    return (
        <header class="text-gray-400 bg-gray-900 body-font flex justify-center lg:px-[5rem] ">
        <div class="container flex flex-wrap p-5 pb-0 sm:pb-5 flex-row  items-center">
            <a class="flex title-font font-medium items-center text-white mb-4 sm:mb-0">
            <svg width="45" height="45" viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={()=>navigate("/")} className='cursor-pointer '>
            <circle cx="300" cy="300" r="300" fill="#22C55E"/>
            <path d="M300.12 334.438C280.991 334.438 265.427 318.875 265.427 299.745C265.427 280.615 280.991 265.052 300.12 265.052C319.25 265.052 334.814 280.615 334.814 299.745C334.814 318.876 319.251 334.438 300.12 334.438ZM300.12 287.794C293.531 287.794 288.169 293.156 288.169 299.745C288.169 306.335 293.531 311.696 300.12 311.696C306.71 311.696 312.072 306.335 312.072 299.745C312.072 293.156 306.71 287.794 300.12 287.794Z" fill="white"/>
            <path d="M227.722 446.512C221.442 446.512 216.35 441.421 216.35 435.141V420.677C216.35 381.539 184.51 349.698 145.372 349.698C139.093 349.698 134.001 344.608 134.001 338.327C134.001 332.047 139.093 326.956 145.372 326.956C197.049 326.956 239.093 369 239.093 420.677V435.141C239.093 441.421 234.001 446.512 227.722 446.512Z" fill="white"/>
            <path d="M372.317 446.512C366.037 446.512 360.946 441.421 360.946 435.141V420.677C360.946 369 402.989 326.956 454.667 326.956C460.946 326.956 466.038 332.047 466.038 338.327C466.038 344.608 460.946 349.698 454.667 349.698C415.528 349.698 383.688 381.539 383.688 420.677V435.141C383.688 441.421 378.596 446.512 372.317 446.512Z" fill="white"/>
            <path d="M145.37 349.7C142.552 349.7 139.732 348.66 137.529 346.563C132.982 342.232 132.806 335.035 137.136 330.487C176.86 288.773 218.818 220.875 252.253 144.204C266.856 110.722 279.261 77.046 289.125 44.1129C290.928 38.0965 297.266 34.6806 303.28 36.4818C309.297 38.2829 312.713 44.6212 310.912 50.6377C300.787 84.4418 288.065 118.98 273.098 153.295C238.642 232.306 195.089 302.607 153.606 346.17C151.371 348.517 148.373 349.7 145.37 349.7Z" fill="white"/>
            <path d="M454.669 349.7C451.665 349.7 448.667 348.517 446.432 346.17C404.933 302.59 361.376 232.29 326.928 153.294C312.009 119.085 299.326 84.6613 289.229 50.9811L289.135 50.6673C287.317 44.6553 290.717 38.3091 296.728 36.4909C302.736 34.6703 309.084 38.0715 310.905 44.0834L311.007 44.4245C320.85 77.2632 333.218 110.825 347.775 144.204C381.202 220.86 423.164 288.757 462.903 330.488C467.234 335.037 467.057 342.233 462.509 346.565C460.308 348.659 457.484 349.7 454.669 349.7Z" fill="white"/>
            <path d="M402.995 548H197.042C190.763 548 185.671 542.909 185.671 536.629V435.141C185.671 428.861 190.763 423.77 197.042 423.77H402.995C409.274 423.77 414.366 428.861 414.366 435.141V536.629C414.366 542.909 409.275 548 402.995 548ZM208.413 525.257H391.624V446.512H208.413V525.257Z" fill="white"/>
            <path d="M402.995 497.262H300.018C293.738 497.262 288.647 492.171 288.647 485.891C288.647 479.61 293.738 474.519 300.018 474.519H402.995C409.274 474.519 414.366 479.61 414.366 485.891C414.366 492.171 409.275 497.262 402.995 497.262Z" fill="white"/>
            <path d="M300.12 287.794C293.841 287.794 288.749 282.703 288.749 276.423V47.3753C288.749 41.095 293.841 36.0042 300.12 36.0042C306.401 36.0042 311.492 41.095 311.492 47.3753V276.424C311.492 282.703 306.401 287.794 300.12 287.794Z" fill="white"/>
            </svg>
            <span class="ml-3 text-xl cursor-pointer sm:ml-2" onClick={()=>navigate("")}>InkFinder</span>
            </a>
            <nav class="mr-auto py-1 pl-4 border-l border-gray-700 flex-wrap items-center text-base justify-center ml-4 hidden sm:flex">
            <a class="mr-5 hover:text-white cursor-pointer" onClick={()=>navigate("/catalog")}>Collection</a>
            <a class="mr-5 hover:text-white cursor-pointer" onClick={()=>navigate("/about")}>About us</a>
            {isAuth ? <a class="mr-5 hover:text-white cursor-pointer" onClick={()=>navigate("/create")}>Post</a> : <div></div>}
            {/* <a class="mr-5 hover:text-white cursor-pointer ">Account</a> */}
            {isAuth ? <a class="mr-5 hover:text-white cursor-pointer" onClick={()=>navigate("/dalle")}>Design Generator</a> : <div></div>}
            {/* <button onClick={()=>setIsOpen(true)}>open</button>
            <SignUpPopUp open={isOpen} close={()=>setIsOpen(false)}/> */}
            </nav>
            <SignUpPopUp open = {isOpen} setActive = {setIsOpen}/>
            {isAuth ?         
      
            <Menu as="div" className="ml-[35%] mb-3 sm:ml-0 sm:mb-0 relative ">
            <div className='flex gap-2'>
            <div className="w-[35px] h-[35px] rounded-full object-cover bg-green-500 flex justify-center items-center text-white text-5xl font-bold" onClick={()=>navigate(`/account/${userId}`)}>
            <svg width="15" height="19" viewBox="0 0 50 56" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M23.0625 0.671878C16.1406 1.40625 10.1719 6.4375 8.20312 13.2188C6.29688 19.8281 8.65625 27.375 13.9375 31.5156C14.5938 32.0313 15.1406 32.5 15.1406 32.5469C15.1562 32.5938 14.7812 32.7969 14.3438 33C12.8906 33.6563 10.75 35.0313 9.25 36.25C5.17188 39.5469 2.15625 44.2031 0.84375 49.2344C0.453125 50.7344 0 53.7813 0 54.8906V55.5H2.46875H4.9375L5.14062 53.6719C5.625 48.9375 7.375 45.0781 10.5469 41.7656C16.2031 35.8438 24.5938 33.9688 32.2969 36.9063C37.8125 39.0156 42.2031 43.7031 44.0469 49.4688C44.5469 51 44.9844 53.5625 45 54.8281V55.5H47.5H50V54.6719C50 53.4531 49.5781 50.7813 49.1406 49.125C47.3125 42.2656 42.2812 36.125 36.0625 33.1875C35.3906 32.8594 34.8594 32.5781 34.8594 32.5313C34.8594 32.4844 35.2812 32.1406 35.8125 31.75C37.7969 30.2813 40.0156 27.3906 41.0625 24.9531C45.6562 14.1406 38.5469 1.9375 26.9062 0.671878C25.1406 0.484378 24.8594 0.484378 23.0625 0.671878ZM26.8438 5.65625C33.3594 6.71875 37.8594 12.2813 37.4531 18.7813C37.1094 24.1875 33.5781 28.5469 28.3281 30.0625C26.7188 30.5313 23.4375 30.5625 21.875 30.1406C14.8125 28.1875 10.9062 20.9375 13.2031 13.9844C15.0625 8.35938 21.0312 4.71875 26.8438 5.65625Z" fill="#111827"/>
            </svg>
            </div>
            <Menu.Button>
            <div className='pt-1.5'>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.5 8.25L12 15.75L4.5 8.25" stroke="#4ADE80" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            </div>
            </Menu.Button>
            </div>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
            <Menu.Items as="div" className="absolute right-0 bg-gray-800 rounded mt-2 sm:mt-4 px-1 pb-2">
            <div className='mt-2 flex-col flex sm:gap-2 gap-2'>
            <Menu.Item key={1} as={Fragment} className="hover:bg-gray-700">
                        {({ active }) => (
                    <div className='flex items-center w-full rounded'>
                    <ArrowRightOnRectangleIcon className='h-[1.3rem] mt-1 ml-2 text-green-400'/>
                    <button 
                    onClick={()=>{  
                        if(isAuth){ 
                            dispatch(logout())
                            navigate("/")
                        }
                    }}
                    class="w-[6rem] inline-flex items-center border-0 py-1 px-2 focus:outline-none text-base md:mt-0 text-gray-400">
                        Log out 
                    </button> 
                    </div>
                        )}
            </Menu.Item>
            <Menu.Item key={2} as={Fragment} className="hover:bg-gray-700 flex sm:hidden">
                        {({ active }) => (
                    <div className='flex items-center w-full rounded'>
                    <PhotoIcon className='h-[1.3rem] mt-1 ml-2 text-green-400'/>
                    <button 
                    onClick={()=>{  
                            navigate("/catalog")
                    }}
                    class="w-[6rem] inline-flex items-center border-0 py-1 px-2 focus:outline-none text-base md:mt-0 text-gray-400">
                        Collection
                    </button> 
                    </div>
                        )}
            </Menu.Item>
            <Menu.Item key={3} as={Fragment} className="hover:bg-gray-700 flex sm:hidden">
                        {({ active }) => (
                    <div className='flex items-center w-full rounded'>
                    <InformationCircleIcon className='h-[1.4rem] mt-1 ml-2 text-green-400'/>
                    <button 
                    onClick={()=>{  
                            navigate("/about")
                    }}
                    class="w-[6rem] inline-flex items-center border-0 py-1 px-2 focus:outline-none text-base md:mt-0 text-gray-400">
                        About Us
                    </button> 
                    </div>
                        )}
            </Menu.Item>
            <Menu.Item key={4} as={Fragment} className="hover:bg-gray-700 flex sm:hidden">
                        {({ active }) => (
                    <div className='flex items-center w-full rounded'>
                    <DocumentArrowUpIcon className='h-[1.3rem] ml-2 text-green-400'/>
                    <button 
                    onClick={()=>{  
                            navigate("/create")
                    }}
                    class="w-[6rem] inline-flex items-center border-0 py-1 px-2 focus:outline-none text-base md:mt-0 text-gray-400">
                        Post
                    </button> 
                    </div>
                        )}
            </Menu.Item>
            <Menu.Item key={4} as={Fragment} className="hover:bg-gray-700 flex sm:hidden">
                        {({ active }) => (
                    <div className='flex items-center w-full rounded'>
                    <CpuChipIcon className='h-[1.3rem] ml-2 text-green-400'/>
                    <button 
                    onClick={()=>{  
                            navigate("/dalle")
                    }}
                    class="w-[6rem] inline-flex items-center border-0 py-1 px-2 focus:outline-none text-base md:mt-0 text-gray-400">
                        Generator
                    </button> 
                    </div>
                        )}
            </Menu.Item>
            </div>
            </Menu.Items>
            </Transition>
            </Menu>

            :
            <button 
                onClick={()=>dispatch(setIsOpen(true))}
                class="flex items-center bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-1 mb-[1rem] sm:mb-0 ml-auto sm:ml-0">
                    Sign Up
                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-1" viewBox="0 0 24 24">
                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
            </button>}
            
        </div>
        </header>
    );
};

export default Header;