import type { IAnime } from '../types/animeType'
import AnimeCard from './animeCard'

// Vi tager en liste af anime ind som prop
function AnimeGrid({ animes }: { animes: IAnime[] }) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {animes.map(anime => (
                <AnimeCard key={anime.mal_id} anime={anime} />
            ))}
        </div>
    )
}

export default AnimeGrid