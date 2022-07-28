import { useState } from 'react'
import './FilmDetail.css'

function FilmDetail(props) {
  const [showMoreDetails, setShowMoreDetails] = useState(false)

  return (
    <div className="FilmDetail is-hydrated">
      <figure className="film-backdrop">
        {props.title && (
          <img
            src={`https://image.tmdb.org/t/p/w1280${props.backdrop_path}`}
            alt={`${props.title} film backdrop`}
          />
        )}
        <h1 className="film-title">{props.title}</h1>
      </figure>

      <button
        className="button-9"
        onClick={() => setShowMoreDetails(!showMoreDetails)}
      >
        {showMoreDetails ? 'Hide Details' : 'More Details'}
      </button>

      {showMoreDetails && (
        <div className="film-meta">
          <p>{props.tagline}</p>
          <p className="film-detail-overview">
            <img
              src={`https://image.tmdb.org/t/p/w400${props.poster_path}`}
              className="film-detail-poster"
              alt={`${props.title} film poster`}
            />
            {props.overview}
          </p>
        </div>
      )}
    </div>
  )
}

export function FilmDetailEmpty() {
  return (
    <div className="FilmDetail">
      <p>
        <i className="material-icons">subscriptions</i>
        <span>No film selected</span>
      </p>
    </div>
  )
}

export default FilmDetail
