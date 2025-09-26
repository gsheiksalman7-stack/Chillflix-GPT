import React from "react";
import { FaPlay } from "react-icons/fa";
import { IoMdInformationCircleOutline } from "react-icons/io";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="absolute pt-[20%] px-4 md:px-12 text-white bg-gradient-to-r from-black w-screen aspect-video">
      <h1 className="text-lg md:text-4xl font-bold">{title}</h1>
      <p className="hidden md:inline-block py-4 text-sm md:text-base w-full md:w-1/2">{overview}</p>
      <div className="flex flex-wrap gap-2 mt-4">
        <button className="bg-white text-black py-1 md:py-2 px-3 md:px-6 text-sm md:text-base rounded-md hover:bg-opacity-80 flex items-center gap-1">
          <FaPlay />
          Play
        </button>
        <button className="hidden md:flex items-center bg-gray-500 text-white py-2 px-6 text-sm bg-opacity-50 rounded-md gap-1">
          <IoMdInformationCircleOutline className="text-xl"/>
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
