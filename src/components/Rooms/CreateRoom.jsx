import React from 'react'
import CloseIcon from "../../assets/Close.svg"
import MagicIcon from "../../assets/Magic.svg"
import { getTopic } from "../../services/meeting"
import { createMeeting } from '../../store/roomSlice'
import toast, {Toaster} from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'

const CreateRoom = ({ isOpen, onClose }) => {
  const [roomData, setRoomData] = React.useState({
    roomName: '',
    maxParticipants: '',
    scheduledAt: '',
    isEnd: false
  })
  const [isGenerating, setIsGenerating] = React.useState(false)
  const dispatch = useDispatch();
  const {createLoading} = useSelector((state) => state.room);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      const response = await dispatch(createMeeting(roomData)).unwrap();
      console.log(response)
      onClose()
    } catch (error) {
      console.log(error)
      toast.error(error);
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    
    if (name === 'isEnd' && checked) {
      const currentDateTime = getCurrentDateTime()
      setRoomData(prev => ({
        ...prev,
        [name]: checked,
        scheduledAt: currentDateTime
      }))
    } else {
      setRoomData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }))
    }
  }

  const handleGenerateRoomName = async () => {
    setIsGenerating(true)
    try {
      const topic = await getTopic();
      if (topic) {
        setRoomData(prev => ({
          ...prev,
          roomName: `${topic}`
        }))
      }
    } catch (error) {
      console.error('Error generating room name:', error)
      // Fallback room names
      const fallbackNames = [
        'Creative Discussion Room',
        'Innovation Workshop',
        'Brainstorming Session',
        'Team Collaboration',
        'Ideas Exchange'
      ]
      const randomName = fallbackNames[Math.floor(Math.random() * fallbackNames.length)]
      setRoomData(prev => ({
        ...prev,
        roomName: randomName
      }))
    } finally {
      setIsGenerating(false)
    }
  }

  const getCurrentDateTime = () => {
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')
    const hours = String(now.getHours()).padStart(2, '0')
    const minutes = String(now.getMinutes()).padStart(2, '0')
    
    return `${year}-${month}-${day}T${hours}:${minutes}`
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md mx-4 p-6 animate-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Create Discussion Room</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <img src={CloseIcon} alt="close" className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div>
            <label htmlFor="roomName" className="block text-sm font-medium text-gray-700 mb-2">
              Room Name <span className='text-red-700'>*</span>
            </label>
            <div className='relative flex items-center'>
              <input
                type="text"
                id="roomName"
                name="roomName"
                required
                value={roomData.roomName}
                onChange={handleChange}
                className="w-full px-3 py-2 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent"
                placeholder="Enter room name"
              />
              <button
                type="button"
                onClick={handleGenerateRoomName}
                disabled={isGenerating}
                className="absolute right-2 p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                title="Generate room name using AI"
              >
                {isGenerating ? (
                  <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-700 rounded-full animate-spin"></div>
                ) : (
                  <img 
                    src={MagicIcon} 
                    alt="Generate name" 
                    className="w-5 h-5"
                  />
                )}
              </button>
            </div>
            {isGenerating && (
              <p className="text-xs text-gray-500 mt-1">Generating creative room name...</p>
            )}
          </div>

          <div>
            <label htmlFor="maxParticipants" className="block text-sm font-medium text-gray-700 mb-2">
              Participants <span className='text-red-700'>*</span>
            </label>
            <input
              type="number"
              id="maxParticipants"
              name="maxParticipants"
              required
              min="2"
              max="10"
              value={roomData.maxParticipants}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent"
              placeholder="Number of participants (2-10)"
            />
          </div>

          <div>
            <label htmlFor="scheduledAt" className="block text-sm font-medium text-gray-700 mb-2">
              Schedule Date & Time <span className='text-red-700'>*</span>
            </label>
            <input
              type="datetime-local"
              id="scheduledAt"
              name="scheduledAt"
              required
              min={getCurrentDateTime()}
              value={roomData.scheduledAt}
              onChange={handleChange}
              disabled={roomData.isEnd}
              className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent ${
                roomData.isEnd ? 'bg-gray-100 cursor-not-allowed' : ''
              }`}
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="isEnd"
              name="isEnd"
              checked={roomData.isEnd}
              onChange={handleChange}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-gray-700"
            />
            <label htmlFor="isEnd" className="ml-2 text-sm text-gray-700">
              Start meeting immediately
            </label>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={createLoading}
              className="cursor-pointer flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
            >
              {createLoading ? 'Creating...' : 'Create Room'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateRoom