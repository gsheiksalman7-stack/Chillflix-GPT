import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GPTMovieSearch = () => {
  const { movieNames, movieResults } = useSelector((store) => store.gpt);

  if (!movieNames) return null;

  console.log(movieResults)

  return (
    <div className="p-4 m-4 bg-black text-white bg-opacity-80 font-bold">
      {movieNames.map((movieName, index) => (
        <MovieList key={index} title={movieName} movies={movieResults[index]} />
      ))}
    </div>
  );
};

export default GPTMovieSearch;
