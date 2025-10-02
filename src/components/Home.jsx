import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../store/authSlice'
import Sidebar from './Home/Sidebar'
import Hero from './Home/Hero'

const Home = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <div className="min-h-screen bg-gray-100 w-full flex flex-col md:flex-row">
      <div className='h-16 md:min-h-screen w-full md:w-1/19 p-2'>
        <Sidebar />
      </div>
      <div className='min-h-screen w-full md:w-18/19 p-2'>
        <Hero />
      </div>
    </div>
  )
}

export default Home