import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
// import FilmDetail from './components/FilmDetail'
import FilmLibrary from "./components/FilmLibrary"
import FilmRow from "./components/FilmRow"
import Homepage from "./components/Homepage"
import NotFound from "./components/NotFound"

function App() {
  return (
    <BrowserRouter>
      <Link to="/films">Films</Link>

      <Routes>
        <Route path="/films" element={<FilmLibrary />}>
          <Route path=":filmID" element={<FilmRow />} />
        </Route>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Homepage />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App

// use navlink instead of link
