import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  // console.log(movies?.[0])
  return (
    <div className="px-6 bg-black">
      <h1 className="text-2xl py-4 text-white">{title}</h1>
      <div className="flex"></div>
      <div className="flex overflow-x-scroll scrollbar-hide space-x-4 py-2 scroll-smooth">
        {movies?.map((movie) => (
          <MovieCard key={movie.id} posterPath={movie?.poster_path} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
