import React from 'react'
import '../styles.css'
const MovieCard = ({ movie, isWatchListed, toggleWatchList }) => {
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
      <img
        src={`images/${movie.image}`}
        alt={movie.title}
        onError={handleError}
      />
      <div className='movie-card-infor'>
        <h3>{movie.title}</h3>
        <div className=''>
          <p className='movie-card-year'>{movie.year}</p>
          <span className='movie-card-genre'>{movie.genre}</span>
          <span className={`movie-card-rating ${getRatingClass(movie.rating)}`}>
            Rating: {movie.rating}
          </span>
        </div>
        <label className='switch'>
          <input
            type='checkbox'
            checked={isWatchListed}
            onChange={() => toggleWatchList(movie.id)}
          ></input>
          <span className='slider'>
            <span className='slider-label'>
              {isWatchListed ? 'In Watchlist' : 'Add to Watchlist'}
            </span>
          </span>
        </label>

        <span className='movie-card-description '>{movie.description}</span>
      </div>
      <div className='movie-card-actions'>
        <button className='btn'>Watch </button>
      </div>
    </div>
  )
}

export default MovieCard
