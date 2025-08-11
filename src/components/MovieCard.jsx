import React from 'react'
import '../styles.css'
const MovieCard = ({ movie }) => {
  if (!movie) {
    return <div className='movie-card'>Loading...</div>
  }
  const handleError = (e) => {
    e.target.src = 'images/default.jpg' // Fallback image if the original fails to load
  }
  const getRatingClass = (rating) => {
    if (rating >= 8) return 'rating-good'
    if (rating >= 5) return 'rating-ok'
    return 'rating-bad'
  }
  return (
    <div className='movie-card' key={movie.id}>
      <img src={movie.image} alt={movie.title} onError={handleError} />
      <div className='movie-card-infor'>
        <h3>{movie.title}</h3>
        <p className='movie-card-year'>{movie.year}</p>
        <p className='movie-card-genre'>{movie.genre}</p>
        <p className={`movie-card-rating ${getRatingClass(movie.rating)}`}>
          Rating: {movie.rating}
        </p>
        <p className='movie-card-description '>{movie.description}</p>
      </div>
      <div className='movie-card-actions'>
        <button className='btn'>Watch Now</button>
      </div>
    </div>
  )
}

export default MovieCard
