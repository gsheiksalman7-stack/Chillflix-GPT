import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MovieList from "./MovieList";
import { resetGPTState } from "./utils/gptSlice";

const GPTMovieSearch = () => {
  const { movieNames, movieResults } = useSelector((store) => store.gpt);
  const dispatch = useDispatch();
  
  useEffect(() => {
    return () => {
      dispatch(resetGPTState());
    };
  }, []);

  return (
    <>
      {movieNames && (
        <div className="p-4 m-4 bg-black text-white bg-opacity-80 font-bold">
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
