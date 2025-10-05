import { useSelector } from 'react-redux'
import MeetingCard from '../Utils/MeetingCard'

const SchedulePage = () => {
  const { meetings, createLoading } = useSelector((state) => state.room);
  
  if (createLoading) {
    return (
      <div className="h-full bg-white rounded-lg shadow-sm flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-700 rounded-full animate-spin"></div>
          <p className="text-gray-600">Loading meetings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-white rounded-lg shadow-sm flex flex-col">
      <div className="flex-shrink-0 p-6 md:p-8 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Scheduled Meetings</h1>
            <p className="text-gray-600 mt-1">
              Manage all your upcoming discussions
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
              {meetings.length} {meetings.length === 1 ? 'Meeting' : 'Meetings'}
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 md:p-8">
        {meetings.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full min-h-[400px]">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No meetings scheduled</h3>
            <p className="text-gray-500 text-center max-w-md">
              You don't have any upcoming meetings. Create a new discussion room to get started.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 pb-4">
            {meetings.map((meeting, index) => (
              <div 
                key={meeting._id} 
                className="h-fit border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 ease-in-out hover:scale-[1.02] hover:border-gray-300 bg-white"
              >
                <MeetingCard roomData={meeting} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default SchedulePage