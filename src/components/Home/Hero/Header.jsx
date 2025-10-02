import React from 'react'
import { useSelector } from 'react-redux'

const Header = React.memo(() => {
    const {user} = useSelector((state) => state.auth);
    const [currentDateTime, setCurrentDateTime] = React.useState(new Date());

    React.useEffect(() => {
        const timer = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, [])

    const formattedDateTime = React.useMemo(() => {
        const day = currentDateTime.toLocaleDateString('en-US', { weekday: 'long' });
        const dateStr = currentDateTime.toLocaleDateString('en-US', { 
            month: 'long', 
            day: 'numeric',
            year: 'numeric'
        });
        const time = currentDateTime.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit', 
            hour12: true 
        });
        
        return (
            <div className='flex flex-col items-center md:items-end'>
                <span className='text-sm md:text-lg font-medium text-gray-600 text-center md:text-right'>
                    {day}, {dateStr}
                </span>
                <span className='text-lg md:text-2xl font-bold text-[#1b263b]'>
                    {time}
                </span>
            </div>
        );
    }, [currentDateTime]);

  return (
    <div className='flex flex-col md:flex-row justify-between items-center text-2xl md:text-6xl font-black text-[#657993] p-3 md:p-4 gap-3 md:gap-0'>
        <span className='text-center md:text-left'>
            Welcome back, <span className='text-[#1b263b]'>
                {user?.name?.split(" ")[0]}
            </span>
            &nbsp;!
        </span>
        <span className='hidden md:block text-lg md:text-2xl font-semibold'>
            {formattedDateTime}
        </span>
    </div>
  )
})

export default Header