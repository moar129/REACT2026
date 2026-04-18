import { useState } from 'react'
import { useFetchTopAnimeQuery } from '../store/apis/animeApi'
import AnimeGrid from '../components/animeGrid'
import PageHeader from '../components/pageHeader'
import LoadingSpinner from '../components/loading'
import ErrorMessage from '../components/errorMessage'
import { TrendingUp} from 'lucide-react'

const FILTERS = [
    { label: 'Alle', value: '' },
    { label: 'TV', value: 'tv' },
    { label: 'Film', value: 'movie' },
    { label: 'OVA', value: 'ova' },
] // FILTERS is a array of objects that we use to create the filter buttons. 

function HomePage() {
    // useState gemmer hvilket filter der er valgt
    // filter starter som en tom string = "Alle"
    // setFilter er funktionen vi kalder når brugeren klikker en knap
    const [filter, setFilter] = useState('')

    // RTK-Query giver os tre nyttige værdier tilbage:
    // data      = selve anime-listen når den er hentet
    // isLoading = true mens den henter data
    // isError   = true hvis noget gik galt
    const { data, isLoading, isError } = useFetchTopAnimeQuery(filter)

    return (
        <div>
            <PageHeader icon={TrendingUp} title="Top Anime" />
            {/* FILTER KNAPPER, Vi bruger .map() til at lave én knap for hvert filter i FILTERS listen */}
            <div className="flex gap-2 mb-8">
                {FILTERS.map(f => (
                    <button key={f.value} onClick={() => setFilter(f.value)}
                        className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors duration-200 ${
                            filter === f.value
                                ? 'bg-rose-accent text-white' : 'bg-bg-surface border border-border text-gray-400 hover:text-white hover:border-rose-accent'}`}>
                        {f.label}
                    </button>
                ))}
            </div>
            {isLoading && <LoadingSpinner />}
            {isError && <ErrorMessage />}
            {data && <AnimeGrid animes={data.data} />}
        </div>
    )
}

export default HomePage