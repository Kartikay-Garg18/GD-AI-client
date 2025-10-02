import React from 'react'

const TimerComponent = () => {
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

    return formattedDateTime;
}

const Timer = React.memo(TimerComponent, () => true);

export default Timer