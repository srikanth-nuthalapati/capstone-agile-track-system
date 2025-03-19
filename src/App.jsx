import Nav from './components/Nav'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import Signup from './components/Signup'
import { UserProvider } from './context/UserContext'
import UserProfiles from './components/UserProfiles'
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useEffect, useState } from 'react'

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  if (isLoading) {
    return (
        <Skeleton height='100vh' width="100%" baseColor="#ddd6fe" highlightColor="#c4b5fd" />
    )
  }

  return (
    <UserProvider>
      <Nav />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/profiles' element={<UserProfiles />} />
      </Routes>
    </UserProvider>
  )
}

export default App
