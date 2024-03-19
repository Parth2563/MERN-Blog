import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Label, TextInput } from 'flowbite-react'

export default function SignUp() {
  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        {/* left side */}
        <div className='flex-1'>
          <Link to='/' className='font-bold dark:text-white text-4xl'>
            <span className='px-2 py-1 bg-teal-500 rounded text-gray-200'>Tech's</span>Blog
          </Link>

          <p className='mt-5 text-sm'>
            This is the Tech Blog website devloped using MERN stack. You can Sign up using email and password or with google account.
          </p>
        </div>

        {/* right side */}
        <div className='flex-1'>
          <form className='flex flex-col gap-4'>
            <div>
              <Label value='Your username'/>
              <TextInput type='text' placeholder='Username'
              id='username' />
            </div>
            <div>
              <Label value='Your email'/>
              <TextInput type='text' placeholder='name@company.com'
              id='email' />
            </div>
            <div>
              <Label value='Your password'/>
              <TextInput type='text' placeholder='Password'
              id='password' />
            </div>
            <Button gradientDuoTone='greenToBlue' type='submit'>
              Sign Up
            </Button>
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Have an account already?</span>
            <Link to='/sign-in' className='text-blue-500'> Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
