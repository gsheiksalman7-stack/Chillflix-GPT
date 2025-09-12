import React from "react";
import GPTSearchBar from "./GPTSearchBar";
import GPTMovieSearch from "./GPTMovieSearch";
import { BACKGROUND_IMG } from "./utils/constants";

const GPTSearch = () => {
  return (
    <>
      <div className="fixed -z-10">
        <img className="h-screen object-cover md:w-screen" src={BACKGROUND_IMG} alt="bg.jpg" />
      </div>
      <div>
        <GPTSearchBar />
        <GPTMovieSearch />
      </div>
    </>
  );
};

export default GPTSearch;
