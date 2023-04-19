import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../store';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SignUpPopUp from './SignUpPopUp';
import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react';


const Header = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isAuth = useSelector(state => state.prodAuth.isAuth)
    // const [isOpen , setIsOpen] = useState(false)
    const [isOpen , setIsOpen] = useState(false)

    return (
        <header class="text-gray-400 bg-gray-900 body-font">
        <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
            <a class="flex title-font font-medium items-center text-white mb-4 md:mb-0">
            <svg class="cursor-pointer" onClick={()=>navigate("/")} width="45" height="45" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="50" fill="#22C55E"/>
            <path d="M46.6515 66.0644L47.8115 70.5326L31.5404 80.8569L32.8967 60.3081L35.3219 59.9269C38.5052 59.4267 41.3872 57.8125 43.4598 55.3873L46.0568 56.4762L47.9677 58.4133L47.1324 60.2765C46.3191 62.0907 46.1496 64.1311 46.6515 66.0644Z" stroke="white" stroke-width="2"/>
            <path d="M71.4159 14.0503C72.4255 12.8506 73.6845 11.9457 75.0859 11.4041C75.4027 13.2224 75.1376 15.0914 74.3117 16.6842C71.7683 21.5891 66.9285 30.834 63.1449 37.5359C60.4706 42.2728 56.8343 47.753 53.856 52.0621C52.3689 54.2137 51.0498 56.0676 50.1027 57.3834C49.6902 57.9564 49.3484 58.4272 49.0941 58.7759L42.7391 54.4377L48.8661 43.9275L56.4955 32.8073L64.6968 22.0339L71.4159 14.0503Z" stroke="white" stroke-width="2"/>
            <path d="M31.4952 80.9689L38.7464 68.8123" stroke="white" stroke-width="2"/>
            <path d="M41.2819 66.8369C41.5376 67.8218 40.9677 68.778 40.0722 69.0104C39.1768 69.2429 38.2138 68.6847 37.9581 67.6997C37.7024 66.7148 38.2723 65.7586 39.1677 65.5262C40.0631 65.2937 41.0262 65.8519 41.2819 66.8369Z" stroke="white" stroke-width="1.5"/>
            <path d="M27.2877 80.6906C27.7816 79.3544 29.3637 78.7897 30.592 79.5113L30.6858 79.5664C31.4153 79.9949 32.3176 80.0037 33.0553 79.5894L35.9744 77.95C36.1407 77.8565 36.3202 77.7886 36.5067 77.7485L39.8759 77.0244C41.1995 76.7399 41.9473 78.4878 40.8275 79.2487L38.3653 81.1544C38.3 81.205 38.2278 81.2462 38.151 81.2767C37.311 81.6111 37.4545 82.8415 38.3489 82.9736L38.5678 83.0059C39.5598 83.1524 39.6693 84.5403 38.7125 84.8406L35 86.0057C34.7023 86.0991 34.4334 86.2669 34.2185 86.4931L33.2701 87.4917C32.0575 88.7684 30.1492 89.0948 28.5813 88.2937L27.8246 87.9071C27.4458 87.7135 27.0092 87.6657 26.5975 87.7725L23.3051 88.6272C22.2008 88.9139 21.4996 87.4781 22.4046 86.7835L22.7812 86.4945C23.3739 86.0396 23.1289 85.0959 22.3898 84.9867L21.5233 84.8587C20.7121 84.7389 20.7092 83.5698 21.5198 83.446C21.6293 83.4293 21.7334 83.3873 21.824 83.3234L23.0478 82.4592C23.5451 82.108 24.1746 82.0007 24.7602 82.1672C25.7721 82.455 26.835 81.9153 27.1998 80.9285L27.2877 80.6906Z" fill="white"/>
            <line x1="58.416" y1="31.376" x2="64.416" y2="35.376" stroke="white" stroke-width="1.5"/>
            </svg>

                {/* <svg class="cursor-pointer" onClick={()=>navigate("/")} width="42" height="42" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="50" fill="#22C55E"/>
                <path d="M46.6515 66.0644L47.8115 70.5326L31.5404 80.8569L32.8967 60.3081L35.3219 59.9269C38.5052 59.4267 41.3872 57.8125 43.4598 55.3873L46.0568 56.4762L47.9677 58.4133L47.1324 60.2765C46.3191 62.0907 46.1496 64.1311 46.6515 66.0644Z" stroke="white" stroke-width="2"/>
                <path d="M71.4159 14.0503C72.4255 12.8506 73.6845 11.9457 75.0859 11.4041C75.4027 13.2224 75.1376 15.0914 74.3117 16.6842C71.7683 21.5891 66.9285 30.834 63.1449 37.5359C60.4706 42.2728 56.8343 47.753 53.856 52.0621C52.3689 54.2137 51.0498 56.0676 50.1027 57.3834C49.6902 57.9564 49.3484 58.4272 49.0941 58.7759L42.7391 54.4377L48.8661 43.9275L56.4955 32.8073L64.6968 22.0339L71.4159 14.0503Z" fill="white" stroke="white" stroke-width="2"/>
                <path d="M31.4952 80.9689L38.7464 68.8123" stroke="white" stroke-width="2"/>
                <path d="M41.2819 66.8369C41.5376 67.8218 40.9677 68.778 40.0722 69.0104C39.1768 69.2429 38.2138 68.6847 37.9581 67.6997C37.7024 66.7148 38.2723 65.7586 39.1677 65.5262C40.0631 65.2937 41.0262 65.8519 41.2819 66.8369Z" stroke="white" stroke-width="1.5"/>
                <path d="M27.2877 80.6906C27.7816 79.3544 29.3637 78.7897 30.592 79.5113L30.6858 79.5664C31.4153 79.9949 32.3176 80.0037 33.0553 79.5894L35.9744 77.95C36.1407 77.8565 36.3202 77.7886 36.5067 77.7485L39.8759 77.0244C41.1995 76.7399 41.9473 78.4878 40.8275 79.2487L38.3653 81.1544C38.3 81.205 38.2278 81.2462 38.151 81.2767C37.311 81.6111 37.4545 82.8415 38.3489 82.9736L38.5678 83.0059C39.5598 83.1524 39.6693 84.5403 38.7125 84.8406L35 86.0057C34.7023 86.0991 34.4334 86.2669 34.2185 86.4931L33.2701 87.4917C32.0575 88.7684 30.1492 89.0948 28.5813 88.2937L27.8246 87.9071C27.4458 87.7135 27.0092 87.6657 26.5975 87.7725L23.3051 88.6272C22.2008 88.9139 21.4996 87.4781 22.4046 86.7835L22.7812 86.4945C23.3739 86.0396 23.1289 85.0959 22.3898 84.9867L21.5233 84.8587C20.7121 84.7389 20.7092 83.5698 21.5198 83.446C21.6293 83.4293 21.7334 83.3873 21.824 83.3234L23.0478 82.4592C23.5451 82.108 24.1746 82.0007 24.7602 82.1672C25.7721 82.455 26.835 81.9153 27.1998 80.9285L27.2877 80.6906Z" fill="white"/>
                </svg> */}

            <span class="ml-3 text-xl cursor-pointer" onClick={()=>navigate("")}>InkFinder</span>
            </a>
            <nav class="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-700 flex flex-wrap items-center text-base justify-center">
            <a class="mr-5 hover:text-white cursor-pointer" onClick={()=>navigate("/catalog")}>Collection</a>
            <a class="mr-5 hover:text-white cursor-pointer" onClick={()=>navigate("/about")}>About us</a>
            {isAuth ? <a class="mr-5 hover:text-white cursor-pointer" onClick={()=>navigate("/create")}>Create</a> : <div></div>}
            {/* <a class="mr-5 hover:text-white cursor-pointer ">Account</a> */}
            {isAuth ? <a class="mr-5 hover:text-white cursor-pointer" onClick={()=>navigate("/dalle")}>Design Generator</a> : <div></div>}
            {/* <button onClick={()=>setIsOpen(true)}>open</button>
            <SignUpPopUp open={isOpen} close={()=>setIsOpen(false)}/> */}
            <SignUpPopUp open = {isOpen} setActive = {setIsOpen}/>
            </nav>
            {isAuth ?               
            <Menu as="div" className="relative">
            <div className='flex gap-2'>
            <div className="w-[35px] h-[35px] rounded-full object-cover bg-green-500 flex justify-center items-center text-white text-5xl font-bold" onClick={()=>navigate("/account")}>
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
            <Menu.Items as="div" className="fixed">
            <div className='mt-4'>
            <Menu.Item key={1} as={Fragment}>
                        {({ active }) => (
                    <button 
                    onClick={()=>{  
                        if(isAuth){ 
                            dispatch(logout())
                            navigate("/")
                        }
                    }}
                    class="inline-flex items-center bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0 text-gray-400">
                        Log out
                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-1" viewBox="0 0 24 24">
                            <path d="M5 12h14M12 5l7 7-7 7"></path>
                        </svg>
                    </button> 
                        )}
            </Menu.Item>
            </div>
            </Menu.Items>
            </Menu>
            :
            <button 
                onClick={()=>setIsOpen(true)}
                class="inline-flex items-center bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0">
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