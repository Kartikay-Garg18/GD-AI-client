import React from 'react'
import CreateIcon from "../../assets/Create.svg";

const CreateCard = React.memo(() => {
  return (
    <div className='cursor-pointer w-full md:w-9/20 bg-white rounded-lg p-2 sm:p-3 md:p-4 flex flex-col gap-2 sm:gap-4 md:gap-6 transition-all duration-300 ease-in-out hover:scale-100 hover:bg-white/30 hover:shadow-lg hover:-translate-y-0.5'>
        <div className='bg-gray-600 w-fit p-1.5 sm:p-2.5 md:p-3 rounded-lg'>
            <img src={CreateIcon} alt="create" className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"/>
        </div>
        <div className="flex flex-col gap-1 sm:gap-2 md:gap-4">
            <div className="text-xs sm:text-sm md:text-base font-medium">Create Discussion Room</div>
            <div className="text-xs sm:text-xs md:text-sm text-gray-600 hidden sm:block">Setup a new discussion and get your group link</div>
        </div>
    </div>
  )
})

export default CreateCard