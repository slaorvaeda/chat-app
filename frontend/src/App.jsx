import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import { Outlet } from 'react-router-dom';
import { axiosInstance } from './lib/axios';
import { useAuthStore } from './stores/useAuthStore';
import { Loader } from 'lucide-react';
import { Toaster } from 'react-hot-toast';

function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <>
      <Navbar />
      {isCheckingAuth && !authUser ? (
        <div className="flex items-center justify-center h-screen">
          <Loader className="animate-spin h-10 w-10 text-blue-500" />
        </div>
      ) : (
        <Outlet />
       
      )}

       <Toaster/>
    </>
  );
}

export default App;