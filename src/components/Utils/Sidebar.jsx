import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/authSlice'
import HomeIcon from "../../assets/Home.svg"
import SettingsIcon from "../../assets/Settings.svg"
import LogoutIcon from "../../assets/Logout.svg"
import HistoryIcon from "../../assets/History.svg"
import CalendarIcon from "../../assets/Calendar.svg"
import { Link } from 'react-router-dom'

const SidebarComponent = () => {
  const dispatch = useDispatch()

  const handleLogout = React.useCallback(() => {
    dispatch(logout())
  }, [dispatch])

  return (
    <div className='border rounded-lg h-full flex flex-row md:flex-col bg-black items-center justify-center md:justify-between px-1 sm:px-2 md:px-3 py-2 sm:py-3 md:py-4 gap-1 sm:gap-2 md:gap-0'>
      <div className='flex flex-row md:flex-col gap-1 sm:gap-2 md:gap-3'>
        <Link to="/home" className='bg-white/20 w-fit p-1.5 sm:p-2 md:p-2.5 rounded-lg cursor-pointer transition-all duration-300 ease-in-out hover:scale-100 hover:bg-white/30 hover:shadow-lg hover:-translate-y-0.5'>
          <img src={HomeIcon} alt='home' className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0"/>
        </Link>
        <Link to="/schedule" className='bg-white/20 w-fit p-1.5 sm:p-2 md:p-2.5 rounded-lg cursor-pointer transition-all duration-300 ease-in-out hover:scale-100 hover:bg-white/30 hover:shadow-lg hover:-translate-y-0.5'>
          <img src={CalendarIcon} alt='calendar' className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0"/>
        </Link>
        <Link to="/history" className='bg-white/20 w-fit p-1.5 sm:p-2 md:p-2.5 rounded-lg cursor-pointer transition-all duration-300 ease-in-out hover:scale-100 hover:bg-white/30 hover:shadow-lg hover:-translate-y-0.5'>
          <img src={HistoryIcon} alt='history' className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0"/>
        </Link>
      </div>
      <div className='flex flex-row md:flex-col gap-1 sm:gap-2'>
        <Link to="/settings" className='bg-white/20 w-fit p-1.5 sm:p-2 md:p-2.5 rounded-lg cursor-pointer transition-all duration-300 ease-in-out hover:scale-100 hover:bg-white/30 hover:shadow-lg hover:-translate-y-0.5'>
          <img src={SettingsIcon} alt='settings' className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0"/>
        </Link>
        <button 
          onClick={handleLogout}
          className='bg-white/20 w-fit p-1.5 sm:p-2 md:p-2.5 rounded-lg cursor-pointer transition-all duration-300 ease-in-out hover:scale-100 hover:bg-red-500/30 hover:shadow-lg hover:-translate-y-0.5'
        >
          <img src={LogoutIcon} alt='logout' className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0"/>
        </button>
      </div>
    </div>
  )
}

const Sidebar = React.memo(SidebarComponent, () => true);

export default Sidebar