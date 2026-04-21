import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../store'
import { removeFavorite } from '../store/slices/favoritesSlice'
import AnimeGrid from '../components/animeGrid'
import PageHeader from '../components/pageHeader'
import { Heart, Trash2 } from 'lucide-react'

function FavoritesPage() {

    // Henter favoritter direkte fra Redux store
    // Ingen API kald her, data ligger allerede i Redux
    const favorites = useSelector((state: RootState) => state.favorites.animeItems)
    const dispatch = useDispatch()

    // Fjerner ALLE favoritter på én gang
    const handleClearAll = () => {
        favorites.forEach(anime => {
            dispatch(removeFavorite(anime.mal_id))
        })
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <PageHeader icon={Heart} title="Favoritter" />
                {favorites.length > 0 && (
                    <button
                        onClick={handleClearAll}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-bg-surface border border-border text-gray-400 hover:border-red-500 hover:text-red-400 transition-colors duration-200 text-sm font-medium">
                        <Trash2 size={16} />
                        Ryd alle
                    </button>
                )}
            </div>
            {favorites.length > 0 && (
                <p className="text-gray-400 mb-6">
                    Du har 
                    <span className="text-white font-medium">
                        {favorites.length}
                    </span> favoritter
                </p>
            )}
            {favorites.length === 0 && ( 
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                    <Heart size={64} className="text-gray-700" />
                    <h2 className="text-xl font-semibold text-gray-400">
                        Ingen favoritter endnu
                    </h2>
                    <p className="text-gray-600 text-sm">
                        Klik på hjertet på en anime for at tilføje den her
                    </p>
                </div>
            )}
            {favorites.length > 0 && (
                <AnimeGrid animes={favorites} />
            )}
        </div>
    )
}

export default FavoritesPage