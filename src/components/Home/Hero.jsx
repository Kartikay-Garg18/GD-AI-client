import React from 'react'
import Header from './Hero/Header'
import MeetingCard from '../Utils/MeetingCard'
import CreateCard from '../Utils/CreateCard'
import JoinCard from '../Utils/JoinCard'

const HeroComponent = () => {
  return (
    <>
    <Header />
    <div className='p-3 md:p-4 py-6 md:py-10 flex flex-col gap-5 md:gap-7'>
        <span className='text-[#1b263b] font-semibold text-sm md:text-base'>
            You have <span className='text-[#657993]'>2</span> upcoming meetings!
        </span>
        <div className='flex flex-col md:flex-row gap-6 md:justify-between'>
            
            <div className='block md:hidden w-full'>
                <div className='flex gap-3 sm:gap-4 mb-6'>
                    <CreateCard />
                    <JoinCard />
                </div>
                <div className='flex flex-col gap-3 sm:gap-4'>
                    <MeetingCard />
                    <MeetingCard />
                    <MeetingCard />
                </div>
            </div>
            
            <div className='hidden md:block w-full md:w-3/10'>
                <div className='flex flex-col gap-3 md:gap-4'>
                    <MeetingCard />
                    <MeetingCard />
                    <MeetingCard />
                </div>
            </div>
            <div className='hidden md:flex w-full md:w-3/5 gap-4 md:gap-6 items-stretch md:items-center'>
                <CreateCard />
                <JoinCard />
            </div>
        </div>
    </div>
    </>
    
  )
}

const Hero = React.memo(HeroComponent, () => true);

export default Hero