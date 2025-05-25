import { useState } from 'react'
// import css from'./App.module.css'
import axios from 'axios';
import SearchBar from '../searchBar/SearchBar.tsx'
import { type Movie } from '../../types/movie.ts';
import MovieGrid from '../movieGrid/MovieGrid.tsx';
import { fetchMovies } from '../../services/movieService.ts';
import ErrorMessage from '../errorMessage/ErrorMessage.tsx';

function App() {

  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);


  const handleSearch = async (newTopic: string) => {
    try {
      setMovies([]);
      const results = await fetchMovies(newTopic);
      setMovies(results);
      setError(null);
    } catch  {
      
      setError("Please enter your search query.");
      setMovies([]);
    }
  };

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      {error && <ErrorMessage message={error} />}
      {movies.length > 0 && <MovieGrid movies={movies} />}
    </>
  )
}

export default App
