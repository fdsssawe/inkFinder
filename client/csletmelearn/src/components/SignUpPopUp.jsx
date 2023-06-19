import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import google from "../media/google.svg";
import { setIsOpen } from '../store/index.js';
import { login, registration , googleAuthHandle } from '../store/index.js';

const SignUpPopUp = ({ open, setActive }) => {
  if (!open) return null;

  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors, isValid } } = useForm({
    mode: "onChange",
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const [loginError, setLoginError] = useState('');

  const onSubmit = (data) => {
    dispatch(registration({ email: data.email, password: data.password }));
  };

  const handleLogin = (data) => {
    console.log(data)
    dispatch(login({ email: data.email, password: data.password }))
      .then((response) => {
        setLoginError('');
        if(response?.error){
            setLoginError('Login failed. Please check your credentials.')
        }
      })
      .catch((error) => {
        setLoginError('Login failed. Please check your credentials.');
      });
  };

  const loginGoogle = useGoogleLogin({
    onSuccess: (user) => {
      console.log(user);
      axios
        .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: 'application/json',
          },
        })
        .then((res) => {
          const data = {
            email: res.data.email,
            password: res.data.id,
          };
          dispatch(googleAuthHandle(data));
        })
        .catch((err) => console.log(err));
    },
    onError: (error) => console.log('Login Failed:', error),
  });

  return (
    <div className='h-[100vh] w-[100vw] bg-black fixed top-0 left-0 bg-opacity-30 flex items-center justify-center z-10'>
      <div className='p-[4px] rounded-[12px]  lg:w-[19%]' onClick={(e) => e.stopPropagation()}>
        <div className="lg:w-full  bg-gray-800  rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
          <div className='flex justify-between'>
            <h2 className="text-white text-lg font-medium title-font mb-5">Sign Up</h2>
            <svg
              width="12"
              height="12"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => {
                dispatch(setIsOpen(false));
              }}
              className="cursor-pointer"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14.3033 16.4246L15.3639 17.4853L17.4853 15.3639L16.4246 14.3033L11.1214 9.00003L16.4246 3.69678L17.4853 2.63612L15.3639 0.514802L14.3033 1.57546L9.00003 6.87871L3.69667 1.57536L2.63601 0.5147L0.514693 2.63602L1.57535 3.69668L6.87871 9.00003L1.57536 14.3034L0.5147 15.364L2.63602 17.4854L3.69668 16.4247L9.00003 11.1214L14.3033 16.4246Z"
                fill="white"
              />
            </svg>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="relative mb-4">
              <label htmlFor="email" className="leading-7 text-sm text-gray-400">
                Email
              </label>
              {errors.email && <div className="text-sm text-red-500">{errors.email.message}</div>}
              <input
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: 'Invalid email format',
                  },
                })}
                type="text"
                id="email"
                className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-green-900 rounded border border-gray-600 focus:border-green-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative mb-4">
              <label htmlFor="password" className="leading-7 text-sm text-gray-400">
                Password
              </label>
              {errors.password && <div className="text-sm text-red-500">{errors.password.message}</div>}
              <input
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters',
                  },
                })}
                type="password"
                id="password"
                className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-green-900 rounded border border-gray-600 focus:border-green-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <button
              disabled={!isValid}
              type="submit"
              className={`text-white w-full border-0 py-2 px-8 focus:outline-none rounded text-lg mb-4 ${
                !isValid ? 'bg-gray-400 hover:bg-gray-600' : 'bg-green-500 hover:bg-green-600'
              }`}
            >
              Create account
            </button>
          </form>
          <button
            disabled={!isValid}
            onClick={handleSubmit(handleLogin)}
            className={`text-white  border-0 py-2 px-8 focus:outline-none rounded text-lg mb-4 ${
              !isValid ? 'bg-gray-400 hover:bg-gray-600' : 'bg-green-500 hover:bg-green-600'
            }`}
          >
            Login
          </button>
          <button
            onClick={loginGoogle}
            className={`text-white border-0 bg-green-500 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg flex`}
          >
            <img src={google} className="mr-3" alt="Google" />
            Continue with Google
          </button>
          {loginError && <p className="text-sm text-red-500 mt-3">{loginError}</p>}
          <p className="text-xs mt-3">We will send an activation letter to the email you provide</p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPopUp;
