import React from "react";
import { FaPlay } from "react-icons/fa";
import { IoMdInformationCircleOutline } from "react-icons/io";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="absolute pt-[20%] px-20 text-white bg-gradient-to-r from-black w-screen aspect-video">
      <h1 className="text-6xl font-bold">{title}</h1>
      <p className="py-6 text-lg w-1/3">{overview}</p>
      <div className="flex">
        <button className="bg-white text-black p-4 px-12 text-xl rounded-lg hover:bg-opacity-80 flex items-center gap-2">
          <FaPlay />
          Play
        </button>
        <button className="mx-2 bg-gray-500 text-white p-4 px-12 text-xl bg-opacity-50 rounded-lg flex items-center gap-2">
          <IoMdInformationCircleOutline className="text-3xl"/>
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
