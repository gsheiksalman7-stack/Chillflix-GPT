import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  return (
    <div className="px-3 bg-black bg-opacity-60">
      <h1 className="text-base md:text-xl py-2 text-white">{title}</h1>
      <div className="flex overflow-x-scroll scrollbar-hide py-1 gap-2 scroll-smooth">
        {movies?.map((movie) => (
          <MovieCard key={movie.id} posterPath={movie?.poster_path} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
