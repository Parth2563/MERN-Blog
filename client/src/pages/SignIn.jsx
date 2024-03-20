import {React, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import { useDispatch, useSelector } from 'react-redux'
import {signInStart, signInSuccess, signInFailure} from '../redux/user/userSlice'

export default function SignIn() {

  const [formData, setFormData] = useState();//hook to store form data
  const {loading, error : errorMessages} = useSelector((state) => state.user);//hook to get data from redux store
  const dispatch = useDispatch();//to dispatch action to redux store
  const navigate = useNavigate();//to redirect user on particular page
  
  //dynamically storing data while user typing in particulr input field relative to its id
  const handleChange = (event) => {
    setFormData({...formData, [event.target.id] : event.target.value.trim()});
  };
  //handling event after user click on Sign Up button
  const handleSubmit = async (event) => {
    event.preventDefault();
    if(!formData.email || !formData.password) {//empty field error
      return dispatch(signInFailure('Please fill all the fields'));
    }
    try {
      dispatch(signInStart());//dispatching action to redux store to set loading to true
      const res = await fetch('/api/authen/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if(data.success === false) {//error detected
        dispatch(signInFailure(data.message));//dispatching action to redux store to set error message
      }
     
      if(res.ok) {
        dispatch(signInSuccess(data));//dispatching action to redux store to set current user
        navigate('/');
      }
    } catch (error) {
      setErrorMessages(error.message);
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        {/* left side */}
        <div className='flex-1'>
          <Link to='/' className='font-bold dark:text-white text-4xl'>
            <span className='px-2 py-1 bg-teal-500 rounded text-gray-200'>Tech's</span>Blog
          </Link>

          <p className='mt-5 text-sm'>
            This is the Tech Blog website devloped using MERN stack. You can Sign In using email and password or with google account.
          </p>
        </div>

        {/* right side */}
        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
              <Label value='Your email'/>
              <TextInput type='email' placeholder='name@company.com'
              id='email' onChange={handleChange}/>
            </div>
            <div>
              <Label value='Your password'/>
              <TextInput type='password' placeholder='**********'
              id='password' onChange={handleChange}/>
            </div>
            <Button gradientDuoTone='greenToBlue' type='submit' disabled={loading}>
              {
                loading ? (
                  <>
                    <Spinner size='sm' />
                    <span className='pl-3'>Loading...</span>
                  </>
                ) : 'Sign In'

              }
            </Button>
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Don't Have an account?</span>
            <Link to='/sign-up' className='text-blue-500'> Sign Up</Link>
          </div>
          {//if there is any error then alert gonna pop up showing respective error message
            errorMessages &&
            <Alert className='mt-5' color='failure'>
              {errorMessages}
            </Alert>
          }
        </div>
      </div>
    </div>
  )
}
