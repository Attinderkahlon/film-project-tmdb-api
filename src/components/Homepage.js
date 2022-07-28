import React from 'react'
import { Link } from 'react-router-dom'
import './Homepage.css'

function Homepage() {
  return (
    <>
      <h2>Welcome to the Film Library</h2>
      <p>
        This is a simple film library app. It allows you to search for films by
        title, year, or genre. You can also add films to your favorites list.
      </p>
      <p>
        You can also search for films by year. You can also add films to your
        favorites list.
      </p>
      <Link to="/films">Go to the film library</Link>
    </>
  )
}

export default Homepage
