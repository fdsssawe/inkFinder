import React from 'react';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { login, registration } from '../store/index.js';

const SignUpPopUp = ({open , setActive}) => {

    if(!open) return null

    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className='h-[100vh] w-[100vw] bg-black fixed top-0 left-0 bg-opacity-30 flex items-center justify-center'>
            <div className='p-[4px] rounded-[12px]' onClick={e => e.stopPropagation()}>
            <div className="lg:w-full md:w-1/2 bg-gray-800  rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
            <div className='flex justify-between'>
            <h2 className="text-white text-lg font-medium title-font mb-5">Sign Up </h2>
            <svg width="12" height="12" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={()=>{setActive(false)}} className="cursor-pointer">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M14.3033 16.4246L15.3639 17.4853L17.4853 15.3639L16.4246 14.3033L11.1214 9.00003L16.4246 3.69678L17.4853 2.63612L15.3639 0.514802L14.3033 1.57546L9.00003 6.87871L3.69667 1.57536L2.63601 0.5147L0.514693 2.63602L1.57535 3.69668L6.87871 9.00003L1.57536 14.3034L0.5147 15.364L2.63602 17.4854L3.69668 16.4247L9.00003 11.1214L14.3033 16.4246Z" fill="white"/>
            </svg>
            </div>
            <div className="relative mb-4">
                <label htmlFor="full-name" className="leading-7 text-sm text-gray-400">Email</label>
            <input 
                type="text" 
                id="full-name" 
                name="email"             
                onChange={e => setEmail(e.target.value)}
                value={email}
                className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-green-900 rounded border border-gray-600 focus:border-green-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
            </input>  
            </div>
            <div className="relative mb-4">
                <label htmlFor="email" className="leading-7 text-sm text-gray-400">Password</label>
            <input 
                type="password" 
                onChange={e => setPassword(e.target.value)}
                value={password}
                className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-green-900 rounded border border-gray-600 focus:border-green-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
            </input>
            </div>
            <button 
                onClick={()=>dispatch(registration({ email, password }))}
                className="text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg mb-4">
                Create account
            </button>
            <button 
                onClick={()=>dispatch(login({ email, password }))}
                className="text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg">
                Login
            </button>
            <p className="text-xs mt-3">We will send activation letter to email you provide</p>
            </div>
            </div>
        </div>
    );
};

export default SignUpPopUp;