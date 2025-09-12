import React from "react";
import { FaPlay } from "react-icons/fa";
import { IoMdInformationCircleOutline } from "react-icons/io";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="absolute pt-[20%] px-6 md:px-20 text-white bg-gradient-to-r from-black w-screen aspect-video">
      <h1 className="text-xl md:text-6xl font-bold">{title}</h1>
      <p className="hidden md:inline-block py-6 text-lg w-1/3">{overview}</p>
      <div className="flex mt-4 md:mt-0">
        <button className="bg-white text-black p-1 md:p-4 px-4 md:px-12 text-xl rounded-lg hover:bg-opacity-80 flex items-center gap-2">
          <FaPlay />
          Play
        </button>
        <button className="hidden md:flex items-center mx-2 bg-gray-500 text-white p-4 px-12 text-xl bg-opacity-50 rounded-lg gap-2">
          <IoMdInformationCircleOutline className="text-3xl"/>
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
