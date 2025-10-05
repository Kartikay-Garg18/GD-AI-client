import React from 'react'
import {Toaster} from 'react-hot-toast'
import RoomForm from './RoomUtils/RoomForm'
import RoomShowCode from './RoomUtils/RoomShowCode'

const CreateRoom = ({ isOpen, onClose }) => {
  const [showForm, setShowForm] = React.useState(true);
  const [roomCode, setRoomCode] = React.useState(null);
  
  return (
    <>
    <Toaster position="top-right" />
    {showForm ? <RoomForm isOpen={isOpen} onClose={onClose} setShowForm={setShowForm} setRoomCode={setRoomCode}/> : <RoomShowCode isOpen={isOpen} onClose={onClose} roomCode={roomCode} setShowForm={setShowForm}/>}
    </>
  )
}

export default CreateRoom