import React, { useEffect } from 'react'
import Navbar from './components/Navbar';
import { Routes ,Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import SettingPage from './pages/SettingPage';
import ProfilePage from './pages/ProfilePage';
import { axiosInstance } from './lib/axios';
import { useAuthStore } from './stores/useAuthStore';
import {Loader} from 'lucide-react';


function App() {
  const {authUser,checkAuth ,isCheckingAuth} = useAuthStore();

  useEffect(() =>{
    checkAuth();
  },[checkAuth]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
       <Loader className="animate-spin h-10 w-10 text-blue-500" />
      </div>
    );
  }



  return (
    <>
      <Navbar />



      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/login" element={!authUser ?<LoginPage /> : <Navigate to= "/" />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/settings" element={<SettingPage />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login"/>} />


      </Routes>
    </>
    );
}

export default App;