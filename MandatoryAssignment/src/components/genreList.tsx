import { Link } from 'react-router-dom'
import type { IGenre } from '../types/animeType'

// GenreList komponenten tager en liste af genrer som prop og viser dem som små badges
function GenreList({ genres }: { genres: IGenre[] }) {
    return (
        <div className="flex flex-wrap gap-2">
            {genres.map(genre => (
                <Link
                    key={genre.mal_id}
                    to={`/genre/${genre.mal_id}`}
                    // stopPropagation forindrer at Link inde i et andet
                    // klikbart element (fx AnimeCard) trigger begge på én gang
                    state={{ genreName: genre.name }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-rose-accent/20 text-rose-hover 
                               border border-rose-accent/30
                               px-3 py-1 rounded-full text-sm
                               hover:bg-rose-accent hover:text-white
                               transition-colors duration-200">
                    {genre.name}
                </Link>
            ))}
        </div>
    )
}

export default GenreList

