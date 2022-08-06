import {Routes, Route} from 'react-router-dom'
import HomePage from './views/HomePage'
import DetailPage from './views/DetailPage'
import GenrePage from './views/GenrePage'
export default function App () {
  return(
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/genre" element={<GenrePage />} />
        <Route path="/detailMovies/:id" element={<DetailPage />} />
      </Routes>
    </>
  )
}