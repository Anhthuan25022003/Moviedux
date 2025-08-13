import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './styles.css'
import Header from './components/Header'
import Footer from './components/Footer'
import MovieGrid from './components/MovieGrid'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import WatchList from './components/WatchList'
import axios from 'axios'

function App() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [watchList, setWatchList] = useState([])
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

  const addToWatchList = (movieId) => {
    setWatchList((prevWatchList) =>
      prevWatchList.includes(movieId)
        ? prevWatchList.filter((id) => id !== movieId)
        : [...prevWatchList, movieId]
    )
  }
  return (
    <div className='App'>
      <div className='container'>
        <Header />
        <BrowserRouter>
          <nav>
            <ul>
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <Link to='/watchlist'>Watch List</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route
              path='/'
              element={
                <MovieGrid
                  movies={movies}
                  watchList={watchList}
                  toggleWatchList={addToWatchList}
                />
              }
            />
            <Route
              path='/watchlist'
              element={
                <WatchList
                  movies={movies}
                  watchList={watchList}
                  toggleWatchList={addToWatchList}
                />
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
      <Footer />
    </div>
  )
}

export default App

