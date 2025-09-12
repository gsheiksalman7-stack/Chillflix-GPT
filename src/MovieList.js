import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  return (
    <div className="px-6 bg-black bg-opacity-60">
      <h1 className="text-lg md:text-2xl py-4 text-white">{title}</h1>
      <div className="flex overflow-x-scroll scrollbar-hide py-2 scroll-smooth">
        {movies?.map((movie) => (
          <MovieCard key={movie.id} posterPath={movie?.poster_path} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
