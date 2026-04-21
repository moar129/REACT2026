import { useState } from 'react'
import { Search } from 'lucide-react'
import { useFetchSearchAnimeQuery, useFetchAnimeGenresQuery } from '../store/apis/animeApi'
import AnimeGrid from '../components/animeGrid'
import PageHeader from '../components/pageHeader'
import LoadingSpinner from '../components/loading'
import ErrorMessage from '../components/errorMessage'

function SearchPage() {
    const [inputValue, setInputValue] = useState('') // Dette er det vi binder til input-feltet. Det opdateres hver gang brugeren skriver noget
    const [searchTerm, setSearchTerm] = useState('') // Dette er det faktiske søgeterm vi sender til API'et. Det opdateres først når brugeren klikker "Søg" eller trykker Enter
    const [selectedGenre, setSelectedGenre] = useState('') // Gemmer den valgte genre fra dropdown. Starter som tom string = "Alle genres"

    // Henter alle genres til dropdown
    const { data: genreData } = useFetchAnimeGenresQuery()

    // Skip søgning hvis hverken søgeterm eller genre er valgt
    const { data, isLoading, isError } = useFetchSearchAnimeQuery(
        { searchTerm, genreId: selectedGenre },
        { skip: searchTerm === '' && selectedGenre === '' }
    )

    const handleSearch = () => {
        if (inputValue.trim() !== '') {
            setSearchTerm(inputValue.trim())
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') handleSearch()
    }

    // Når genre ændres søger vi med det samme automatisk
    const handleGenreChange = (genreId: string) => {
        setSelectedGenre(genreId)
    }

    const hasSearched = searchTerm !== '' || selectedGenre !== ''

    return (
        <div>
            <PageHeader icon={Search} title="Søg efter anime" />
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => {
                        setInputValue(e.target.value)
                        // Hvis feltet tømmes → nulstil searchTerm også
                        if (e.target.value === '') {
                            setSearchTerm('')
                        }
                    }}
                    onKeyDown={handleKeyDown}
                    placeholder="Søg efter anime..."
                    className="flex-1 bg-bg-surface border border-border rounded-lg
                               px-4 py-2 text-white placeholder-gray-500
                               focus:outline-none focus:border-rose-accent
                               transition-colors duration-200"
                />
                <select
                    value={selectedGenre}
                    onChange={(e) => handleGenreChange(e.target.value)}
                    className="bg-bg-surface border border-border rounded-lg
                               px-4 py-2 text-white
                               focus:outline-none focus:border-rose-accent
                               transition-colors duration-200 cursor-pointer">
                    <option value="">Alle genres</option>
                    {genreData?.data.map(genre => (
                        <option key={genre.mal_id} value={String(genre.mal_id)}>
                            {genre.name}
                        </option>
                    ))}
                </select>
                <button
                    onClick={handleSearch}
                    className="flex items-center justify-center gap-2 bg-rose-accent 
                               hover:bg-rose-hover text-white px-6 py-2 rounded-lg 
                               font-medium transition-colors duration-200">
                    <Search size={18} />
                    Søg
                </button>
            </div>

            {hasSearched && !isLoading && (
                <p className="text-gray-400 mb-6">
                    {searchTerm && (
                        <>Resultater for: <span className="text-white font-medium">"{searchTerm}"</span></>
                    )}
                    {searchTerm && selectedGenre && <span> — </span>}
                    {selectedGenre && (
                        <>Genre: <span className="text-white font-medium">
                            {genreData?.data.find(g => String(g.mal_id) === selectedGenre)?.name}
                        </span></>
                    )}
                </p>
            )}

            {isLoading && <LoadingSpinner />}
            {isError && <ErrorMessage />}
            

            {/* Ingen resultater */}
            {data && data.data.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 gap-3">
                    <Search size={48} className="text-gray-600" />
                    <p className="text-gray-400">Ingen anime fundet — prøv en anden søgning</p>
                </div>
            )}

            {data && data.data.length > 0 && <AnimeGrid animes={data.data} />}

            {/* Vis besked hvis ingen søgning endnu */}
            {!hasSearched && (
                <div className="flex flex-col items-center justify-center py-20 gap-3">
                    <Search size={48} className="text-gray-600" />
                    <p className="text-gray-400">Skriv noget eller vælg en genre for at søge</p>
                </div>
            )}

        </div>
    )
}

export default SearchPage