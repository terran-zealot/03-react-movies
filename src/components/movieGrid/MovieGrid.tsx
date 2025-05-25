
// import React from 'react';
import {type Movie } from '../../types/movie';
import styles from './MovieGrid.module.css';

interface MovieGridProps {
  movies: Movie[];                
}

export default function MovieGrid({ movies }: MovieGridProps) {
  if (movies.length === 0) {
    return <p className={styles.noResults}>Нічого не знайдено.</p>;
  }

  return (
    <div className={styles.grid}>
      {movies.map(movie => (
        <div key={movie.id} className={styles.card}>
          {movie.poster_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
              className={styles.image}
            />
          ) : (
            <div className={styles.placeholder}>No Image</div>
          )}
          <h3 className={styles.title}>{movie.title}</h3>
          <p className={styles.date}>{movie.release_date}</p>
        </div>
      ))}
    </div>
  );
}
