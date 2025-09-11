import React from "react";
import GPTSearchBar from "./GPTSearchBar";
import GPTMovieSearch from "./GPTMovieSearch";
import { BACKGROUND_IMG } from "./utils/constants";

const GPTSearch = () => {
  return (
    <div>
      <img className="absolute -z-10" src={BACKGROUND_IMG} alt="bg.jpg" />
      <GPTSearchBar />
      <GPTMovieSearch />
    </div>
  );
};

export default GPTSearch;
