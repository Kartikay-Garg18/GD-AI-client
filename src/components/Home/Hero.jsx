import React from 'react'
import { Link } from 'react-router-dom'
import Header from './Hero/Header'
import MeetingCard from '../Utils/MeetingCard'
import CreateCard from '../Utils/CreateCard'
import JoinCard from '../Utils/JoinCard'
import CreateRoom from '../Rooms/CreateRoom'
import { useSelector } from 'react-redux'
import JoinRoom from '../Rooms/JoinRoom'

const HeroComponent = () => {
    const [isCreateRoomOpen, setCreateRoomOpen] = React.useState(false);
    const [isJoinRoomOpen, setJoinRoomOpen] = React.useState(false);

    const {meetings} = useSelector((state) => state.room)

    const handleCreateOpen = ()=> {
        setCreateRoomOpen(true);
    }

    const handleJoinOpen = ()=> {
        setJoinRoomOpen(true);
    }

    const handleCreateClose = () => {
        setCreateRoomOpen(false);
    }

    const handleJoinClose = () => {
        setJoinRoomOpen(false);
    }

    
    const displayedMeetings = React.useMemo(() => meetings.slice(0, 3), [meetings]);
    const hasMoreMeetings = React.useMemo(() => meetings.length > 3, [meetings.length]);
    const remainingCount = React.useMemo(() => meetings.length - 3, [meetings.length]);

    
    const ShowMoreButton = React.useMemo(() => {
        if (!hasMoreMeetings) return null;
        
        return (
            <Link 
                to="/schedule"
                className='w-full bg-gray-100 hover:bg-gray-200 rounded-lg p-3 flex items-center justify-center gap-2 transition-colors duration-200'
            >
                <span className='text-gray-700 font-medium text-sm'>
                    Show {remainingCount} more meetings
                </span>
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </Link>
        );
    }, [hasMoreMeetings, remainingCount]);

    const ShowMoreButtonDesktop = React.useMemo(() => {
        if (!hasMoreMeetings) return null;
        
        return (
            <Link 
                to="/schedule"
                className='w-full bg-gray-100 hover:bg-gray-200 rounded-lg p-3 flex items-center justify-center gap-2 transition-colors duration-200'
            >
                <span className='text-gray-700 font-medium text-sm'>
                    Show {remainingCount} more
                </span>
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </Link>
        );
    }, [hasMoreMeetings, remainingCount]);

  return (
    <>
    <Header />
    <div className='p-3 md:p-4 py-6 md:py-9 flex flex-col gap-5 md:gap-7 overflow-hidden'>
        <span className='text-[#1b263b] font-semibold text-sm md:text-base'>
            You have <span className='text-[#657993]'>{meetings.length}</span> upcoming meetings!
        </span>
        <div className='flex flex-col md:flex-row gap-6 md:justify-between'>
            
            <div className='block md:hidden w-full'>
                <div className='flex gap-3 sm:gap-4 mb-6'>
                    <CreateCard handleCreateOpen={handleCreateOpen}/>
                    <JoinCard handleJoinOpen={handleJoinOpen}/>
                </div>
                <div className='flex flex-col gap-3 sm:gap-4'>
                    {displayedMeetings.map((meeting) => (
                        <MeetingCard 
                            key={meeting._id || meeting.id} 
                            roomData={meeting}
                        />
                    ))}
                    {ShowMoreButton}
                </div>
            </div>
            
            
            <div className='hidden md:flex w-full md:gap-6'>
                <div className='w-3/10 flex-shrink-0'>
                    <div className='flex flex-col gap-3 md:gap-4'>
                        {displayedMeetings.map((meeting) => (
                            <MeetingCard 
                                key={meeting._id || meeting.id} 
                                roomData={meeting}
                            />
                        ))}
                        {ShowMoreButtonDesktop}
                    </div>
                </div>
                
                <div className='w-3/5 flex gap-4 md:gap-6 items-start'>
                    <CreateCard handleCreateOpen={handleCreateOpen}/>
                    <JoinCard handleJoinOpen={handleJoinOpen}/>
                </div>
            </div>
        </div>
    </div>
    <CreateRoom isOpen={isCreateRoomOpen} onClose={handleCreateClose}/>
    <JoinRoom isOpen={isJoinRoomOpen} onClose={handleJoinClose}/>
    </>
    
  )
}

const Hero = React.memo(HeroComponent);

export default Hero