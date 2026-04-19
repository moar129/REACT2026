import type { IGenre } from '../types/animeType'

// GenreList komponenten tager en liste af genrer som prop og viser dem som små badges
function GenreList({ genres }: { genres: IGenre[] }) {
    return (
        <div className="flex flex-wrap gap-2">
            {genres.map(genre => (
                <span key={genre.mal_id}
                    className="bg-rose-accent/20 text-rose-hover border border-rose-accent/30 px-3 py-1 rounded-full text-sm">
                    {genre.name}
                </span>
            ))}
        </div>
    )
}

export default GenreList