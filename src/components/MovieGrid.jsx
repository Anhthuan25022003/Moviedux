import axios from 'axios'
import React, { useEffect, useState } from 'react'
import MovieCard from './MovieCard'

const MovieGrid = () => {
  const [movies, setMovies] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
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
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
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
      <div className='movies-grid'>
        {filteredMovies.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
    </div>
  )
}

export default MovieGrid
