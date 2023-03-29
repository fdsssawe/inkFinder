import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../store';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isAuth = useSelector(state => state.prodAuth.isAuth)


    return (
        <header class="text-gray-400 bg-gray-900 body-font">
        <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
            <a class="flex title-font font-medium items-center text-white mb-4 md:mb-0">
            <svg class="cursor-pointer" onClick={()=>navigate("/")} width="42" height="42" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="50" fill="#22C55E"/>
            <path d="M46.6515 66.0644L47.8115 70.5326L31.5404 80.8569L32.8967 60.3081L35.3219 59.9269C38.5052 59.4267 41.3872 57.8125 43.4598 55.3873L46.0568 56.4762L47.9677 58.4133L47.1324 60.2765C46.3191 62.0907 46.1496 64.1311 46.6515 66.0644Z" stroke="white" stroke-width="2"/>
            <path d="M71.4159 14.0503C72.4255 12.8506 73.6845 11.9457 75.0859 11.4041C75.4027 13.2224 75.1376 15.0914 74.3117 16.6842C71.7683 21.5891 66.9285 30.834 63.1449 37.5359C60.4706 42.2728 56.8343 47.753 53.856 52.0621C52.3689 54.2137 51.0498 56.0676 50.1027 57.3834C49.6902 57.9564 49.3484 58.4272 49.0941 58.7759L42.7391 54.4377L48.8661 43.9275L56.4955 32.8073L64.6968 22.0339L71.4159 14.0503Z" fill="white" stroke="white" stroke-width="2"/>
            <path d="M31.4952 80.9689L38.7464 68.8123" stroke="white" stroke-width="2"/>
            <path d="M41.2819 66.8369C41.5376 67.8218 40.9677 68.778 40.0722 69.0104C39.1768 69.2429 38.2138 68.6847 37.9581 67.6997C37.7024 66.7148 38.2723 65.7586 39.1677 65.5262C40.0631 65.2937 41.0262 65.8519 41.2819 66.8369Z" stroke="white" stroke-width="1.5"/>
            <path d="M27.2877 80.6906C27.7816 79.3544 29.3637 78.7897 30.592 79.5113L30.6858 79.5664C31.4153 79.9949 32.3176 80.0037 33.0553 79.5894L35.9744 77.95C36.1407 77.8565 36.3202 77.7886 36.5067 77.7485L39.8759 77.0244C41.1995 76.7399 41.9473 78.4878 40.8275 79.2487L38.3653 81.1544C38.3 81.205 38.2278 81.2462 38.151 81.2767C37.311 81.6111 37.4545 82.8415 38.3489 82.9736L38.5678 83.0059C39.5598 83.1524 39.6693 84.5403 38.7125 84.8406L35 86.0057C34.7023 86.0991 34.4334 86.2669 34.2185 86.4931L33.2701 87.4917C32.0575 88.7684 30.1492 89.0948 28.5813 88.2937L27.8246 87.9071C27.4458 87.7135 27.0092 87.6657 26.5975 87.7725L23.3051 88.6272C22.2008 88.9139 21.4996 87.4781 22.4046 86.7835L22.7812 86.4945C23.3739 86.0396 23.1289 85.0959 22.3898 84.9867L21.5233 84.8587C20.7121 84.7389 20.7092 83.5698 21.5198 83.446C21.6293 83.4293 21.7334 83.3873 21.824 83.3234L23.0478 82.4592C23.5451 82.108 24.1746 82.0007 24.7602 82.1672C25.7721 82.455 26.835 81.9153 27.1998 80.9285L27.2877 80.6906Z" fill="white"/>
            </svg>

            <span class="ml-3 text-xl cursor-pointer" onClick={()=>navigate("")}>InkFinder</span>
            </a>
            <nav class="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-700 flex flex-wrap items-center text-base justify-center">
            <a class="mr-5 hover:text-white cursor-pointer">Collection</a>
            <a class="mr-5 hover:text-white cursor-pointer" onClick={()=>navigate("/about")}>About us</a>
            <a class="mr-5 hover:text-white cursor-pointer ">Account</a>
            {isAuth ? <a class="mr-5 hover:text-white cursor-pointer" onClick={()=>navigate("/users")}>User List</a> : <div></div>}
            {isAuth ? <a class="mr-5 hover:text-white cursor-pointer" onClick={()=>navigate("/dalle")}>Design Generator</a> : <div></div>}
            </nav>
            {isAuth ?               

                <button 
                onClick={()=>{  
                    if(isAuth){ 
                        dispatch(logout())
                        navigate("/")
                    }
                }}
                class="inline-flex items-center bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0">
                    Log out
                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-1" viewBox="0 0 24 24">
                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                </button> 
            :
                <button 
                onClick={()=>{  
                    navigate("/signup")
                }}
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