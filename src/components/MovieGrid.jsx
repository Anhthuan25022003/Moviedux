import axios from 'axios'
import React, { useEffect, useState } from 'react'
import MovieCard from './MovieCard'
import '../styles.css'

const MovieGrid = () => {
  const [movies, setMovies] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [genreFilter, setGenreFilter] = useState('All genres')
  const [ratingFilter, setRatingFilter] = useState('All')
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await axios.get('movies.json')
        console.log(data)

        setMovies(data.data)
        console.log(data.data)
      } catch (error) {
        console.error('Error fetching movies:', error)
      }
    }
    fetchMovies()
  }, [])

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleGenreChange = (e) => {
    setGenreFilter(e.target.value)
  }
  const handleRatingChangge = (e) => {
    setRatingFilter(e.target.value)
  }
  const matchGenre = (movie, genreFilter) => {
    return (
      genreFilter === 'All genres' ||
      movie.genre.toLowerCase() === genreFilter.toLowerCase()
    )
  }
  const matchRating = (movie, ratingFilter) => {
    switch (ratingFilter) {
      case 'All':
        return true // If no rating filter is applied, include all movies
      case 'Good':
        return movie.rating >= 8
      case 'Ok':
        return movie.rating >= 5
      case 'Bad':
        return movie.rating < 5
      default:
        return false // If no rating filter is applied, include all movies
    }
  }
  const mathSearch = (movie, searchTerm) => {
    return movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  }
  const filteredMovies = movies.filter(
    (movie) =>
      matchGenre(movie, genreFilter) &&
      matchRating(movie, ratingFilter) &&
      mathSearch(movie, searchTerm)
  )
  return (
    <div className=''>
      <input
        value={searchTerm}
        type='text'
        className='search-input'
        placeholder='Search for a movie...'
        onChange={handleSearchChange}
      />
      <div className='filter-bar'>
        <div className='filter-slot'>
          <label>Gerne</label>
          <select
            className='filter-dropdown'
            value={genreFilter}
            onChange={handleGenreChange}
          >
            <option>All</option>
            <option>Action</option>
            <option>Fantasy</option>
            <option>Drama</option>
            <option>Horror</option>
          </select>
        </div>
        <div className='filter-slot'>
          <label>Rating</label>
          <select
            className='filter-dropdown'
            value={ratingFilter}
            onChange={handleRatingChangge}
          >
            <option>All</option>
            <option>Good</option>
            <option>Ok</option>
            <option>Bad</option>
          </select>
        </div>
      </div>

      <div className='movies-grid'>
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))
        ) : (
          <p className='no-results'>No movies found...</p>
        )}
      </div>
    </div>
  )
}

export default MovieGrid
