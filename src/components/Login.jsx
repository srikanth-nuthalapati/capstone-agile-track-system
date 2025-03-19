import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import '../styles/login.css';

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useContext(UserContext);

    const handleChange = (e) => {
        if (e.target.name === 'email') {
            setEmail(e.target.value);
        }
        else if (e.target.name === 'password') {
            setPassword(e.target.value);
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(` http://localhost:3000/users?email=${email}&password=${password}`);
            if (response.data.length > 0) {
                const user = response.data[0];
                login(user);
                alert("login success")
                if (user.role === 'admin') {
                    navigate('/');
                } else {
                    navigate('/profiles');
                }
            }
            else {
                alert('Invalid email or password');
            }
        }
        catch(error) {
            console.log("Error logging in:", error);
        }
    }

  return (
    <div className='login-container'>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
            <label htmlFor="email">Email:</label>
            <input type="email" name='email' required value={email} onChange={handleChange} />

            <label htmlFor="password">Password:</label>
            <input type="password" name='password' required value={password} onChange={handleChange} />

            <button type='submit'>Login</button>

            <button onClick={() => navigate('/signup')}>Sign Up</button>
        </form>
    </div>
  )
}
