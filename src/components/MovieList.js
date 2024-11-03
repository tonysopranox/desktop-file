import React from 'react';

function MovieList({ movies, savedMovies, toggleSaveMovie }) {
  return (
    <div className="movies">
      {movies.map((movie) => (
        <div key={movie.id} className="movie">
          <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
          <h3>{movie.title}</h3>
          <button onClick={() => toggleSaveMovie(movie)}>
            {savedMovies.find((m) => m.id === movie.id) ? 'Pašalinti' : 'Įrašyti'}
          </button>
        </div>
      ))}
    </div>
  );
}

export default MovieList