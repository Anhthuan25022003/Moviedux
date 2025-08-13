import React from 'react'
import MovieCard from './MovieCard'

const WatchList = ({ movies, watchList, toggleWatchList }) => {
  return (
    <div>
      <h1 className='title'>Your Watchlist</h1>
      <div className='watchlist'>
        {watchList.length > 0 ? (
          watchList.map((movieId) => {
            const movie = movies.find((m) => m.id === movieId)
            return (
              <MovieCard
                key={movie.id}
                movie={movie}
                toggleWatchList={toggleWatchList}
                isWatchListed={true}
              />
            )
          })
        ) : (
          <p className='no-results'>Your watchlist is empty...</p>
        )}
      </div>
    </div>
  )
}

export default WatchList
