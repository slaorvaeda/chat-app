import { MessagesSquare } from 'lucide-react';
import React, { useState } from 'react'

function SignUpPage() {
  // const [showPassword, setShowPassword] = useState(false);
  // const [formData, setFormData] = useState({
  //   username: '',
  //   email: '',
  //   password: '',
  // });

  // const [signup, setSignup] = useAuthStore();

  // const validateForm = () => {}
  // const handleInputChange = (e) => { 
  //   e.preventDefault();
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();
  }


  return (
   <>
   <div className="min-h-screen grid lg:grid-cols-2">
    <div className="flex flex-col justify-center items-center p-6 sm:p-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center mb-8">
          <div className="flex flex-col items-center gap-2 group">
            <div className="size-12 rounded-xl bg-primary/10 flex justify-center items-center group-hover:bg-primary/20 transition-colors">
            <MessagesSquare className="size-6 text-primary " />
            </div>
            <h1 className="text-2xl font-semibold text-gray-800">Sign Up</h1>
            <p className="text-sm text-gray-500">Create a new account</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className="form-contol">
            <label htmlFor="" className='label'>
              <span className="label-text font-medium">Full Name:</span>
            </label>

          </div>
        </form>
      </div>
    </div>
   </div>
   </>
  )
}

export default SignUpPage