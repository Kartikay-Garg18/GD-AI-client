import React from 'react'
import Sidebar from './Utils/Sidebar'
import Hero from './Home/Hero'
import { addMeetings } from '../store/roomSlice'
import { useDispatch } from 'react-redux'
import SchedulePage from './Home/SchedulePage'
import { useLocation } from 'react-router-dom'

const Home = React.memo(() => {
  const dispatch = useDispatch();
  const location = useLocation();
  React.useEffect(()=>{
    dispatch(addMeetings());
  },[])

  const routes = {
    '/home' : Hero,
    '/' : Hero,
    '/schedule' : SchedulePage
  }

  const getCurrentComponent = () => {
    const Component = routes[location.pathname] || Hero;
    return <Component />;
  }

  return (
    <div className="min-h-screen bg-gray-100 w-full flex flex-col md:flex-row">
      <div className='h-16 md:min-h-screen w-full md:w-1/19 p-2'>
        <Sidebar />
      </div>
      <div className='min-h-screen w-full md:w-18/19 p-2'>
        {getCurrentComponent()}
      </div>
    </div>
  )
})

export default Home