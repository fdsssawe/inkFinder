import React, { useState } from 'react';
import { login, registration } from '../store/index.js';
import { useDispatch } from 'react-redux';
import "../index.css"

const LoginForm = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  

    return (
        <div className=' flex-col items-center lg:pt-46 md:pt-20  bg-gray-900 h-screen'>
        <section className="text-gray-400 bg-gray-900 body-font ">
        <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
            <div className="lg:w-3/6 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
            <h1 className="title-font font-medium text-3xl text-white">
                Letmelearn Project
            </h1>
            <p className="leading-relaxed mt-4">
                Create account to be able to answer to offers and learn something new
            </p>
            </div>
            <div className="lg:w-3/6 md:w-1/2 bg-gray-800 bg-opacity-50 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
            <h2 className="text-white text-lg font-medium title-font mb-5">Sign Up</h2>
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
        </section>
        </div>
    );
};

export default LoginForm;