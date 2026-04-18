import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Star, Tv, Heart } from 'lucide-react'
import type { IAnime } from '../types/animeType'
import type { RootState } from '../store/index'
import { addFavorite, removeFavorite } from '../store/slices/favoritesSlice'


function AnimeCard({ anime }: { anime: IAnime }) { // this is the props for the anime card, it takes an anime object of type IAnime
    const dispatch = useDispatch()
    const favorites = useSelector((state: RootState) => state.favorites.animeItems)
    const isFavorite = favorites.some(fav => fav.mal_id === anime.mal_id)
    const handleFavorite = (e: React.MouseEvent) => { // happens when the user clicks the favorite button.
        e.preventDefault()
        if (isFavorite) {
            dispatch(removeFavorite(anime.mal_id))
        } else {
            dispatch(addFavorite(anime))
        }
    }
    return (
        <Link to={`/anime/${anime.mal_id}`}>
            {/* Card */}
            <div className="bg-bg-surface border border-border rounded-xl overflow-hidden 
            hover:border-rose-accent transition-all duration-300 hover:scale-105 hover:shadow-lg group cursor-pointer h-full flex flex-col">
                {/* Image Section */}
                <div className="relative">
                    <img src={anime.images.jpg.image_url} alt={anime.title} className="w-full h-64 object-cover"/>
                    <button onClick={handleFavorite} className="absolute top-2 right-2 p-2 rounded-full bg-black/60 hover:bg-black/80 transition-colors duration-200">
                        <Heart size={18} className={isFavorite ? 'text-rose-accent fill-rose-accent' : 'text-white'} />
                    </button>
                    {/* Score badge nederst til venstre på billedet
                        Vises kun hvis anime har en score (ikke null/undefined) */}
                    {anime.score && (
                        <div className="absolute bottom-2 left-2 flex items-center gap-1 
                            bg-black/70 px-2 py-1 rounded-lg">
                            <Star size={12} className="text-yellow-400 fill-yellow-400" />
                            <span className="text-white text-sm font-medium">{anime.score}</span>
                        </div>
                    )}
                </div>
                {/* Card Content */}
                <div className="p-4 flex flex-col flex-1">
                    <h3 className="text-white font-semibold text-sm leading-tight mb-2 group-hover:text-rose-accent transition-colors duration-200 line-clamp-2">
                        {anime.title}
                    </h3>
                    <div className="flex items-center gap-3 mt-auto">
                        <div className="flex items-center gap-1 text-gray-400">
                            <Tv size={13} />
                            <span className="text-xs">
                                {anime.episodes ? `${anime.episodes} ep.` : 'Ukendt'}
                            </span>
                        </div>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${anime.status === 'Currently Airing' ? 'bg-green-900/50 text-green-400' : 'bg-gray-800 text-gray-400'}`}>
                            {anime.status === 'Currently Airing' ? 'Airing' : 'Afsluttet'}
                        </span>
                    </div>
                </div>

            </div>
        </Link>
    )
}
export default AnimeCard