import React, { useRef, useState } from "react";
import lang from "./utils/languageConstants";
import { useDispatch, useSelector } from "react-redux";
import { model } from "./utils/openAI ";
import { API_OPTIONS } from "./utils/constants";
import { addGPTMovieResult,setLoading } from "./utils/gptSlice";
import Loading from "./Loading";

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
    dispatch(setLoading(true))
    const GPTQuery =
      "Act as a Movie Recommendation System and Suggest Some Movies For the Query :" +
      searchText.current.value +
      ". only give 5 movies, comma seperated like the example result given ahead. Example result: Gadar , Sholay, Panchathanthiram";

    const GPTResults = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: GPTQuery }] }],
    });
    const output = GPTResults.response?.text().split(",");
    if (!output || output.length === 0) {
      console.warn("No movie suggestions received from GPT.");
      return;
    }
    console.log(output);

    const promiseArray = output.map((movie) => searchMovie(movie));
    const tmdbResults = await Promise.all(promiseArray);
    console.log(tmdbResults)

    dispatch(
      addGPTMovieResult({ movieNames: output, movieResults: tmdbResults })
    );
    searchText.current.value = "";
    dispatch(setLoading(false));
  };

  return (
    <div className="pt-[30%] md:pt-[8%] flex justify-center px-2">
      <form
        className="w-full max-w-md bg-black grid grid-cols-12 bg-opacity-50 gap-2 rounded-md"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          className="px-2 pr-8 md:pr-0 py-1 m-4 col-span-8 text-sm rounded bg-gray-800 text-white"
          type="text"
          placeholder={lang[langkey].gptSearchPlaceHolder}
        />
        <button
          className="py-1 px-2 bg-red-700 text-sm rounded text-white col-span-4 m-2 md:m-4 hover:bg-red-600"
          onClick={handleGPTSearch}
        >
          {lang[langkey].search}
        </button>
      </form>
    </div>
  );
};

export default GPTSearchBar;
