import { useState } from 'react';
import SearchBar from '../searchBarq/SearchBar';
import { type Movie } from '../../types/movie';
import MovieGrid from '../movieGridq/MovieGrid';
import { fetchMovies } from '../../services/movieService';
import ErrorMessage from '../errorMessageq/ErrorMessage';
import toast, { Toaster } from 'react-hot-toast';
import Loader from '../loaderq/Loader';
import MovieModal from '../movieModalq/MovieModal';



function App() {

  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);


  const handleSearch = async (newTopic: string) => {

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
