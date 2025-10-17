import React from 'react'

const Loading = () => {
  return (
    <div className="flex justify-center items-center bg-black bg-opacity-90 m-4 h-screen">
      <div className="flex flex-col items-center space-y-4">
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-red-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-3 h-3 bg-red-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-3 h-3 bg-red-600 rounded-full animate-bounce"></div>
        </div>
        <p className="text-white text-sm md:text-base font-medium">Great Pick! Fetching movies...</p>
      </div>
    </div>
  )
}

export default Loading