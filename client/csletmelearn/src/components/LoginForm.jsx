import React, { useState } from 'react';
import { login, registration } from '../store/index.js';
import { useDispatch } from 'react-redux';

const LoginForm = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleLogin = (e) => {
      e.preventDefault();
      dispatch(login({ email, password }));
    };

    const handleRegistration = (e) => {
        e.preventDefault();
        dispatch(registration({ email, password }));
      };

    return (
        <div>
            <input 
            type="text" 
            onChange={e => setEmail(e.target.value)}
            placeholder = "Email"
            value={email}
            >
            </input>
            <input 
            type="password" 
            onChange={e => setPassword(e.target.value)}
            placeholder = "Password"
            value={password}
            >
            </input>
            <button onClick={()=>dispatch(login({ email, password }))}>
                Login
            </button>
            <button onClick={()=>dispatch(registration({ email, password }))}>
                Registration
            </button>
        </div>
    );
};

export default LoginForm;