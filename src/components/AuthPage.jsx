import React from 'react'
import { useNavigate } from "react-router-dom"
import { useSelector } from 'react-redux';
import SignIn from './Authentication/SignIn';
import SignUp from './Authentication/SignUp';

const AuthPage = () => {
    const [signIn, setSignIn] = React.useState(true);
    const navigate = useNavigate();
    const { isAuthenticated } = useSelector((state) => state.auth);

    React.useEffect(() => {
        if(isAuthenticated){
            navigate('/dashboard');
        }
    }, [isAuthenticated, navigate]);
    
    const switchToSignIn = () =>{
        setSignIn(true);
    }

    const toggleSignIn = (event) => {
        const isSignIn = event.target.dataset.signin === 'true';
        setSignIn(isSignIn);
    }

  return (
    <div className='container flex items-center w-full h-screen mx-auto'>
        <div className='flex justify-around items-center flex-col w-full lg:w-2/5 h-screen p-4 sm:p-6 lg:p-10 bg-gray-100'>
            <div className='w-full h-17/20 text-center mb-5 flex flex-col gap-4 items-center'>
                <span className='text-xl sm:text-2xl lg:text-3xl font-bold'>SAGE</span>
                <div className='flex justify-center items-center w-full sm:w-4/5 md:w-3/4 lg:w-13/20 p-1 rounded-xl bg-white'>
                    <span data-signin="true" className={`flex-1 lg:flex-none lg:px-14 py-3 rounded-xl text-sm sm:text-base text-center ${signIn ? 'bg-gray-100' : 'bg-white'} cursor-pointer transition-colors`} onClick={toggleSignIn}>Sign In</span>
                    <span data-signin="false" className={`flex-1 lg:flex-none lg:px-14 py-3 rounded-xl text-sm sm:text-base text-center ${!signIn ? 'bg-gray-100' : 'bg-white'} cursor-pointer transition-colors`} onClick={toggleSignIn}>Sign Up</span>
                </div>
                {signIn ? <div className='w-full sm:w-13/20'><SignIn /></div> : <div className='w-full sm:w-13/20'><SignUp switchToSignIn={switchToSignIn} /></div>}
            </div>
        </div>
        <div className='hidden lg:flex justify-center items-center w-3/5 h-screen'>
            Animation
        </div>
    </div>
  )
}

export default AuthPage