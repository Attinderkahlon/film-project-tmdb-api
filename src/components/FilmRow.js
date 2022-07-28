import React from 'react'
import './FilmRow.css'
import { Link } from 'react-router-dom'

function FilmRow(props) {
  return (
    <Link
      to={`/films/${props.id}`}
      className="action"
      style={{ textDecoration: 'none' }}
    >
      <button className="FilmRow">
        <img
          src={`https://image.tmdb.org/t/p/w300${props.poster_path}`}
          alt={`${props.title}`}
        />
        <div className="film-summary">
          <h3>{props.title}</h3>
          <p>{new Date(props.release_date).getFullYear()}</p>
        </div>
      </button>
      {props.addedToQueue ? (
        <button className="fave" onClick={props.onClickRemoveFromQueue}>
          <span className="material-icons">remove_from_queue</span>
        </button>
      ) : (
        <button className="fave" onClick={props.onClickAddToQueue}>
          <span className="material-icons">add_to_queue</span>
        </button>
      )}
    </Link>
  )
}

export default FilmRow
