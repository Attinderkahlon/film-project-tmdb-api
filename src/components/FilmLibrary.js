import React, { useState, useEffect } from 'react'
import FilmDetail, { FilmDetailEmpty } from './FilmDetail'
import { TMDB_API_KEY } from './TMDB'
import './FilmLibrary.css'
import FilmRow from './FilmRow'
import { useParams } from 'react-router'

function FilmLibrary() {
  const [selectedFilm, setSelectedFilm] = useState(null)
  const [favorites, setFavorites] = useState([])
  const [isFavTab, setIsFavTab] = useState(false)
  const [movieList, setMovieList] = useState([])
  const [pageNumber, setPageNumber] = useState(1)
  const [year, setYear] = useState(2022)

  const { filmID } = useParams()

  const isFavorite = (film) => {
    return favorites.some((x) => x.id === film.id)
  }

  const getFilms = async (typedYear = 2022) => {
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&primary_release_year=${typedYear}`
    const response = await fetch(url)
    const data = await response.json()
    setMovieList(data.results)
  }
  useEffect(() => {
    getFilms()
  }, [])

  const getFilmById = async (id) => {
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_API_KEY}`
    const response = await fetch(url)
    const data = await response.json()
    setSelectedFilm(data)
  }

  const loadMoreFilms = async () => {
    setPageNumber(pageNumber + 1)
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&primary_release_year=${year}&page=${pageNumber}`
    const response = await fetch(url)
    const data = await response.json()
    setMovieList([...movieList, ...data.results])
  }

  useEffect(() => {
    filmID && getFilmById(filmID)
  }, [filmID])

  return (
    <>
      <div className="FilmLibrary">
        <div className="film-list">
          <h1 className="section-title">FILMS</h1>
          <div className="film-list-filters">
            <button
              onClick={() => setIsFavTab(false)}
              className={`film-list-filter ${!isFavTab && 'is-active'}`}
            >
              ALL
              <span className="section-count">{movieList.length}</span>
            </button>
            <button
              onClick={() => setIsFavTab(true)}
              className={`film-list-filter ${isFavTab && 'is-active'}`}
            >
              FAVES
              <span className="section-count">{favorites.length}</span>
            </button>
          </div>
          <div className="my-datepicker">
            <label htmlFor="search_year">Search by year</label>
            <br />
            <input
              onChange={(e) => setYear(e.target.value)}
              value={year}
              id="search_year"
            />
            <button className="button-9" onClick={() => getFilms(year)}>
              Search
            </button>
          </div>

          {isFavTab ? (
            favorites.map((item) => (
              <FilmRow
                key={item.id}
                id={item.id}
                title={item.title}
                poster_path={item.poster_path}
                backdrop_path={item.backdrop_path}
                release_date={item.release_date}
                overview={item.overview}
                onClickRemoveFromQueue={() =>
                  setFavorites(favorites.filter((film) => film.id !== item.id))
                }
                addedToQueue={isFavorite(item)}
              />
            ))
          ) : (
            <div>
              {movieList.map((item) => (
                <FilmRow
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  poster_path={item.poster_path}
                  backdrop_path={item.backdrop_path}
                  overview={item.overview}
                  release_date={item.release_date}
                  onClickAddToQueue={() => {
                    setFavorites([...favorites, item])
                  }}
                  onClickRemoveFromQueue={() =>
                    setFavorites(
                      favorites.filter((film) => film.id !== item.id)
                    )
                  }
                  addedToQueue={isFavorite(item)}
                />
              ))}
              <button className="button-9" onClick={() => loadMoreFilms()}>
                Load More
              </button>
            </div>
          )}
        </div>
        <div className="film-details">
          <h1 className="section-title">DETAILS</h1>

          {selectedFilm ? (
            <FilmDetail
              key={selectedFilm.id}
              title={selectedFilm.title}
              tagline={selectedFilm.tagline}
              overview={selectedFilm.overview}
              poster_path={selectedFilm.poster_path}
              backdrop_path={selectedFilm.backdrop_path}
              film={selectedFilm}
              id={selectedFilm.id}
            />
          ) : (
            <FilmDetailEmpty />
          )}
        </div>
      </div>
    </>
  )
}

export default FilmLibrary
