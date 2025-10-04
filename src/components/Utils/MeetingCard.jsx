import React from 'react'
import { Link } from 'react-router-dom'

const MeetingCardComponent = ({roomData}) => {
  
  const formatDateTime = (scheduledAt) => {
    if (!scheduledAt) return 'No date scheduled';
    
    try {
      const date = new Date(scheduledAt);
  
      if (isNaN(date.getTime())) {
        return 'Invalid date';
      }

      const options = { 
        weekday: 'short',
        month: 'short', 
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      };
      
      return date.toLocaleDateString('en-US', options).replace(',', ' at');
    } catch (error) {
      return 'Invalid date';
    }
  };

  return (
    <div className='w-full rounded-lg bg-white p-3 md:p-4 flex flex-col gap-3 md:gap-4 transition-all duration-300 ease-in-out hover:scale-100 hover:bg-white/30 hover:shadow-lg hover:-translate-y-0.5'>
        <>
        <div className='truncate font-semibold text-base md:text-lg text-[#1b263b]'>{roomData.roomName}</div>
        <div className='flex justify-end gap-1 px-1 items-center'>
          <span className="text-sm md:text-base font-medium text-[#1b263b]">
            {formatDateTime(roomData.scheduledAt)}
          </span>
        </div>
        </>
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0'>
            <div className='text-xs md:text-sm'><span className='text-gray-600'>Host: </span><span className='text-[#1b263b]'>{roomData.createdBy.name}</span></div>
            <Link to="" className='text-white rounded-lg bg-[#1b263b] p-2 px-3 text-xs md:text-sm transition-all duration-300 ease-in-out hover:scale-100 hover:bg-[#1b263b]/90 hover:shadow-lg'>Join Discussion</Link>
        </div>
    </div>
  )
}

const MeetingCard = React.memo(MeetingCardComponent, () => true);

export default MeetingCard