import { useState } from 'react'
import { Search } from 'lucide-react'
import { useFetchSearchAnimeQuery } from '../store/apis/animeApi'
import AnimeGrid from '../components/animeGrid'
import PageHeader from '../components/pageHeader'
import LoadingSpinner from '../components/loading'
import ErrorMessage from '../components/errorMessage'

function SearchPage() {

    // inputValue = hvad brugeren skriver i søgefeltet lige nu
    // searchTerm = det vi faktisk sender til API'et
    // Vi har to states fordi vi ikke vil sende et API kald hver gang brugeren skriver en bogstav
    const [inputValue, setInputValue] = useState('')
    const [searchTerm, setSearchTerm] = useState('')

    // skip: true betyder at RTK-Query IKKE henter data før brugeren har søgt på noget
    // Uden skip ville den sende en tom søgning til API'et med det samme
    const { data, isLoading, isError } = useFetchSearchAnimeQuery(searchTerm, {
        skip: searchTerm === ''
    })

    const handleSearch = () => {
        // trim() fjerner mellemrum i starten og slutningen af inputtet
        if (inputValue.trim() !== '') {
            setSearchTerm(inputValue.trim())
        }
    }
    // Gør det muligt at trykke "Enter" for at søge, ikke kun klikke på knappen
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch()
        }
    }

    return (
        <div>
            <PageHeader icon={Search} title="Søg efter anime" />
            <div className="flex gap-3 mb-8">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Søg efter anime..."
                    className="flex-1 bg-bg-surface border border-border rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-rose-accent transition-colors duration-200"
                />
                <button
                    onClick={handleSearch}
                    className="flex items-center gap-2 bg-rose-accent hover:bg-rose-hover text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200">
                    <Search size={18} />
                    Søg
                </button>
            </div>
            {/* "searchTerm er ikke tom  OG  isLoading er false  →  vis teksten" */}
            {searchTerm && !isLoading && (
                <p className="text-gray-400 mb-6">
                    Resultater for: <span className="text-white font-medium">"{searchTerm}"</span>
                </p>
            )}
            {isLoading && <LoadingSpinner />}
            {isError && <ErrorMessage />}

            {/* "søge resultater" */}

            {data && data.data.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 gap-3">
                    <Search size={48} className="text-gray-600" />
                    <p className="text-gray-400">Intet fundet for "{searchTerm}"</p>
                </div>
            )}
            {data && data.data.length > 0 && (
                <AnimeGrid animes={data.data} />
            )}
            {searchTerm === '' && (
                <div className="flex flex-col items-center justify-center py-20 gap-3">
                    <Search size={48} className="text-gray-600" />
                    <p className="text-gray-400">Skriv noget i søgefeltet for at komme i gang</p>
                </div>
            )}
        </div>
    )
}

export default SearchPage