import React, { lazy, Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MovieList from "./MovieList";
import { resetGPTState } from "./utils/gptSlice";
import Loading from "./Loading";

const GPTMovieSearch = () => {
  const { movieNames, movieResults,loading } = useSelector((store) => store.gpt);
  const dispatch = useDispatch();
  
  useEffect(() => {
    return () => {
      dispatch(resetGPTState());
    };
  }, []);

  return (
    <>
      {loading ? (<Loading />) : movieNames &&(
        <div className="p-2 m-2 md:p-4 md:m-4 bg-black text-white bg-opacity-80 font-semibold text-sm md:text-base">
          {movieNames.map((movieName, index) => (
            <MovieList
              key={index}
              title={movieName}
              movies={movieResults[index]}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default GPTMovieSearch;
