import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';

export default function Signup() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        switch (e.target.name) {
            case 'name':
                setName(e.target.value);
                break;
            case 'email':
                setEmail(e.target.value);
                break;
            case 'password':
                setPassword(e.target.value);
                break;
            default:
                console.log('Invalid input');
        }
    }

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/users', {
                name,
                email,
                password,
                role: 'employee'
            });
            navigate('/login');
        }
        catch (error) {
            console.error('Error signing up:', error);
        }
    }

    return (
        <div className='login-container'>
            <h2>Sign Up</h2>
            <form onSubmit={handleSignup}>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={name}
                    onChange={handleChange}
                />

                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    value={email}
                    onChange={handleChange}
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    name='password'
                    id='password'
                    required
                    value={password}
                    onChange={handleChange}
                />

                <button type='submit'>Sign Up</button>
            </form>
        </div>
    )
}
