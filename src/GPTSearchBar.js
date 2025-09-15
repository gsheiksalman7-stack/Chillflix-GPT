import React, { useRef, useState } from "react";
import lang from "./utils/languageConstants";
import { useDispatch, useSelector } from "react-redux";
import { model } from "./utils/openAI ";
import { API_OPTIONS } from "./utils/constants";
import { addGPTMovieResult } from "./utils/gptSlice";

const GPTSearchBar = () => {
  const langkey = useSelector((store) => store.lang.lang);
  const dispatch = useDispatch();
  const searchText = useRef(null);

  const searchMovie = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    return json.results;
  };

  const handleGPTSearch = async () => {
    const GPTQuery =
      "Act as a Movie Recommendation System and Suggest Some Movies For the Query :" +
      searchText.current.value +
      ". only give 5 movies, comma seperated like the example result given ahead. Example result: Gadar , Sholay, Panchathanthiram";

    const GPTResults = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: GPTQuery }] }],
    });
    const output = GPTResults.response?.text().split(",");
    if (!output) {

    }
    console.log(output);

    const promiseArray = output.map((movie) => searchMovie(movie));
    const tmdbResults = await Promise.all(promiseArray);

    dispatch(
      addGPTMovieResult({ movieNames: output, movieResults: tmdbResults })
    );
    searchText.current.value = "";
  };

  return (
    <div className="pt-[40%] md:pt-[10%] flex justify-center">
      <form
        className="w-full md:w-1/2 bg-black grid grid-cols-12 bg-opacity-70"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          className="px-4 m-4 col-span-9"
          type="text"
          placeholder={lang[langkey].gptSearchPlaceHolder}
        />
        <button
          className="py-2 px-1 md:px-4 bg-red-700 rounded-lg text-white col-span-3 m-2 md:m-4"
          onClick={handleGPTSearch}
        >
          {lang[langkey].search}
        </button>
      </form>
    </div>
  );
};

export default GPTSearchBar;
