import React, { useState } from 'react';

const LoginForm = () => {
    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')
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
            value={email}
            >
            </input>
            <button>
                Login
            </button>
            <button>
                Registration
            </button>
        </div>
    );
};

export default LoginForm;