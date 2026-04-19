import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useFetchAnimeByIdQuery } from '../store/apis/animeApi'
import type { RootState } from '../store'
import { addFavorite, removeFavorite } from '../store/slices/favoritesSlice'
import LoadingSpinner from '../components/loading'
import ErrorMessage from '../components/errorMessage'
import StatBadge from '../components/statBadge'
import GenreList from '../components/genreList'
import { Heart, Star, Tv, Users, Trophy } from 'lucide-react'

function AnimeDetailPage() {
    const { id } = useParams() // Henter anime ID fra URL'en, f.eks. /anime/123 -> id = 123
    const { data, isLoading, isError } = useFetchAnimeByIdQuery(Number(id))
    const dispatch = useDispatch()
    const favorites = useSelector((state: RootState) => state.favorites.animeItems)
    const isFavorite = favorites.some(fav => fav.mal_id === Number(id))

    const handleFavorite = () => {
        if (!data) return
        if (isFavorite) {
            dispatch(removeFavorite(data.data.mal_id))
        } else {
            dispatch(addFavorite(data.data))
        }
    }

    if (isLoading) return <LoadingSpinner />
    if (isError) return <ErrorMessage />
    if (!data) return null

    const anime = data.data

    return (
        <div>
            <div className="flex flex-col md:flex-row gap-8 mb-8">
                <img src={anime.images.jpg.large_image_url} alt={anime.title} className="w-full md:w-64 h-96 object-cover rounded-xl border border-border"/>
                <div className="flex flex-col gap-4 flex-1">
                    <h1 className="text-4xl font-bold text-white">{anime.title}</h1>
                    <div className="flex flex-wrap gap-4"> 
                        {anime.score && (<StatBadge icon={Star} value={anime.score} iconClass="text-yellow-400 fill-yellow-400"/>)}
                        <StatBadge icon={Tv} value={anime.episodes ? `${anime.episodes} episoder` : 'Ukendt antal'} />
                        {anime.rank && (<StatBadge icon={Trophy} value={`Rank #${anime.rank}`} />)}
                        {anime.members && (<StatBadge icon={Users} value={`${anime.members.toLocaleString()} medlemmer`} />)}
                    </div>
                    <GenreList genres={anime.genres} />

                    <span className={`w-fit text-sm px-3 py-1 rounded-full 
                    ${ anime.status === 'Currently Airing' ? 'bg-green-900/50 text-green-400' : 'bg-gray-800 text-gray-400'}`}>
                        {anime.status === 'Currently Airing' ? 'Airing' : 'Afsluttet'}
                    </span>
                    <button
                        onClick={handleFavorite}
                        className={`flex items-center gap-2 w-fit px-6 py-2 rounded-lg font-medium transition-colors duration-200 
                            ${isFavorite 
                                ? 'bg-rose-accent text-white hover:bg-rose-hover' 
                                : 'bg-bg-surface border border-border text-gray-400 hover:border-rose-accent hover:text-white'
                            }`}>
                        <Heart size={18} className={isFavorite ? 'fill-white' : ''} />
                        {isFavorite ? 'Fjern favorit' : 'Tilføj favorit'}
                    </button>
                </div>
            </div>
            <div className="bg-bg-surface border border-border rounded-xl p-6">
                <h2 className="text-xl font-semibold text-white mb-3">Synopsis</h2>
                <p className="text-gray-400 leading-relaxed">
                    {anime.synopsis ?? 'Ingen synopsis tilgængelig.'} {/* Hvis synopsis er null eller undefined, vises denne fallback tekst */}
                </p>
            </div>
        </div>
    )
}

export default AnimeDetailPage