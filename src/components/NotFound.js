import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <>
      <h2>Sorry</h2>
      <p>"Uh oh, that page doesn't exist."</p>
      <Link to="/">Back to the homepage...</Link>
    </>
  )
}

export default NotFound
