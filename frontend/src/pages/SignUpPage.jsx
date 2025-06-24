import React, { useState } from 'react'

function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [signup, setSignup] = useAuthStore();

  const validateForm = () => {}
  const handleInputChange = (e) => { 
    e.preventDefault();
  }


  return (
   <>
   <div className="min-h-screen grid lg:grid-cols-2">
    <div className="flex flex-col justify-center items-center p-6 sm:p-12">
      <div className="w-full max-w-md space-y-8"></div>
    </div>
   </div>
   </>
  )
}

export default SignUpPage