import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext';
import '../styles/nav.css';

export default function Nav() {

  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  }

  return (
    <div className='nav-container'>
      <ul>
        <li>
          <Link to={'/'}>Dashboard</Link>
        </li>
        {user ? (
          <>
            <li>
              <Link to={'/profiles'}>Profiles</Link>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        ) : (
          <li>
            <Link to={'/login'}>Login</Link>
          </li>

        )}
      </ul>
    </div>
  )
}
