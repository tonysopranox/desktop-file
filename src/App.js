
import './App.css';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieList from './components/MovieList';
import Search from './components/Search';

const API_KEY = '53c258bb52d305146e19a71e58aa2cc5';

// LT pavadinimai
const genreTranslations = {
  28: 'Veiksmo',
  12: 'Nuotykių',
  16: 'Animacija',
  35: 'Komedija',
  80: 'Kriminalinis',
  99: 'Dokumentika',
  18: 'Drama',
  10751: 'Šeimai',
  14: 'Fantastika',
  27: 'Horror',
  10402: 'Muzikinis',
  9648: 'Mistika',
  10749: 'Romantika',
  878: 'Mokslo fantastika',
  10770: 'TV filmas',
  53: 'Trileris',
  10752: 'Karo',
  37: 'Vesternas'
};

function App() {
  const [movies, setMovies] = useState([])
  const [savedMovies, setSavedMovies] = useState([])
  const [categories, setCategories] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [category, setCategory] = useState(null)

  
  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`)
      .then((response) => {
        const popularMovies = response.data.results.slice(0, 10)
        setMovies(popularMovies)
      })
      .catch((error) => console.error('Failed to fetch movies:', error))
  }, [])

  
  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`)
      .then((response) => {
        const translatedGenres = response.data.genres.map((genre) => ({
          id: genre.id,
          name: genreTranslations[genre.id] || genre.name 
        }))
        setCategories(translatedGenres)
      })
      .catch((error) => console.error('Failed to fetch categories:', error))
  }, [])

  
  const handleSearch = async () => {
    if (searchTerm.length >= 2) {
      const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchTerm}`)
      const searchResults = response.data.results.slice(0, 10)
      setMovies(searchResults)
    }
  }

  
  const filterByCategory = async (genreId) => {
    const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`)
    const categoryMovies = response.data.results.slice(0, 10)
    setMovies(categoryMovies);
  };

  
  const toggleSaveMovie = (movie) => {
    let saved = [...savedMovies]
    const found = saved.find((m) => m.id === movie.id)
    if (found) {
      saved = saved.filter((m) => m.id !== movie.id)
    } else {
      saved.push(movie)
    }
    setSavedMovies(saved)
    localStorage.setItem('savedMovies', JSON.stringify(saved))
  }

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedMovies'))
    if (saved) setSavedMovies(saved)
  }, [])

  return (
    <div className="App">
      <h1>Geriausi filmai</h1>
      <Search
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSearch={handleSearch}
        categories={categories}
        filterByCategory={filterByCategory}
      />
      <MovieList movies={movies} savedMovies={savedMovies} toggleSaveMovie={toggleSaveMovie} />
    </div>
  )
}

export default App