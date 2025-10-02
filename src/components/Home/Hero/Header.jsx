import React from 'react'
import { useSelector } from 'react-redux'
import Timer from './Timer'

const selectUserName = (state) => state.auth.user?.name?.split(" ")[0];

const Header = React.memo(() => {
    const userName = useSelector(selectUserName);

  return (
    <div className='flex flex-col md:flex-row justify-between items-center text-2xl md:text-6xl font-black text-[#657993] p-3 md:p-4 gap-3 md:gap-0'>
        <span className='text-center md:text-left'>
            Welcome back, <span className='text-[#1b263b]'>
                {userName}
            </span>
            &nbsp;!
        </span>
        <span className='hidden md:block text-lg md:text-2xl font-semibold'>
            <Timer />
        </span>
    </div>
  )
})

export default Header