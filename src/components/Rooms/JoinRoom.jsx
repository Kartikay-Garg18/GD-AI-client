import React from 'react'
import toast, {Toaster} from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '../../assets/Close.svg'

const JoinRoom = ({isOpen, onClose}) => {
    const [roomCode, setRoomCode] = React.useState('');
    const [isJoining, setIsJoining] = React.useState(false);
    const navigate = useNavigate();

    const handleJoinRoom = async (e) => {
        e.preventDefault();
        if(!roomCode.trim()){
            toast.error('Please enter a room code');
            return;
        }

        try {
            setIsJoining(true);
            // navigate(`room/${roomCode.trim()}`);
            console.log("Room Joined")
            handleClose();
        } catch (error) {
            toast.error("Failed to join room");
        } finally {
            handleClose();
        }
    }

    const handleClose = () => {
        setRoomCode('');
        setIsJoining(false);
        onClose();
    }

    const handleCodeChange = (e) => {
        const val = e.target.value.replace(/[^a-zA-Z0-9]/g, '');
        setRoomCode(val);
    }

    const handlePaste = (e) => {
        e.preventDefault()
        const paste = (e.clipboardData || window.clipboardData).getData('text')
        const cleanPaste = paste.replace(/[^a-zA-Z0-9]/g, '')
        setRoomCode(cleanPaste)
    }

    if(!isOpen) return null;

  return (
    <>
      <Toaster position="top-right" />
      
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          onClick={handleClose}
        />
        
        <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md mx-4 p-6 animate-in zoom-in-95 duration-200">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Join Discussion Room</h2>
            <button 
              onClick={handleClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <img src={CloseIcon} alt="close" className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleJoinRoom} className="space-y-6">
            
            <div>
              <label htmlFor="roomCode" className="block text-sm font-medium text-gray-700 mb-2">
                Room Code <span className='text-red-700'>*</span>
              </label>
              <input
                type="text"
                id="roomCode"
                name="roomCode"
                required
                value={roomCode}
                onChange={handleCodeChange}
                onPaste={handlePaste}
                placeholder="Enter room code"
                className="w-full px-4 py-3 text-center text-lg font-mono tracking-wider border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent bg-gray-50"
                maxLength={20}
                autoComplete="off"
              />
              <p className="text-xs text-gray-500 mt-2">
                Enter the room code shared by the host
              </p>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={isJoining || !roomCode.trim()}
                className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isJoining ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Joining...
                  </div>
                ) : (
                  'Join Room'
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h4 className="text-sm font-medium text-blue-900 mb-1">How to join</h4>
                <p className="text-xs text-blue-700">
                  Ask the host for the room code and enter it above. The room code is case-insensitive.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default JoinRoom