import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/homePage'
import SearchPage from './pages/searchPage'
import AnimeDetailPage from './pages/animeDetailPage'
import FavoritesPage from './pages/favoritesPage'
import GenrePage from './pages/genrePage'
import NotFoundPage from './pages/notFoundPage'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-bg-primary text-white">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/anime/:id" element={<AnimeDetailPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/genre/:id" element={<GenrePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App