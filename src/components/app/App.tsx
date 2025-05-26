import { useState } from 'react'
import SearchBar from '../SearchBar/SearchBar.tsx'
import { type Movie } from '../../types/movie.ts';
import MovieGrid from '../MovieGrid/MovieGrid.tsx';
import { fetchMovies } from '../../services/movieService.ts';
import ErrorMessage from '../ErrorMessage/ErrorMessage.tsx';
import toast, { Toaster } from 'react-hot-toast';
import Loader from '../Loader/Loader.tsx';
import MovieModal from '../MovieModal/MovieModal.tsx';



function App() {

  const [movies, setMovies] = useState<Movie[]>([]);
  // const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);


  const handleSearch = async (newTopic: string) => {
    // if (!newTopic.trim()) {
    //   toast.error('No movies found for your request.');
    //   return;
    // }
    setHttpError(false);
    setIsLoading(true);
    setMovies([]);
    try {
      const results = await fetchMovies(newTopic);

      if (results.length === 0) {
        toast.error('No movies found for your request.');
      } else {
        setMovies(results);
      }
    } catch {
      setHttpError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-center" />

      <SearchBar onSearch={handleSearch} />

      {isLoading && <Loader />}

      {!isLoading && httpError && <ErrorMessage />}

      {!isLoading && !httpError && movies.length > 0 && (
        <MovieGrid movies={movies}
        onSelect={movie => setSelectedMovie(movie)}/>
      )}
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </>
  );
}
export default App
