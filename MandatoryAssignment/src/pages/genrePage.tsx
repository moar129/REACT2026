import { useParams, useLocation } from 'react-router-dom'
import { Tag } from 'lucide-react'
import { useFetchAnimeByGenreQuery } from '../store/apis/animeApi'
import AnimeGrid from '../components/animeGrid'
import PageHeader from '../components/pageHeader'
import LoadingSpinner from '../components/loading'
import ErrorMessage from '../components/errorMessage'

function GenrePage() {
    // Henter genre id fra URL — fx /genre/1 → id = "1"
    const { id } = useParams()

    // useLocation giver os adgang til state sendt med Link
    // Vi bruger det til at vise genre navnet i headeren
    const location = useLocation()
    const genreName = location.state?.genreName ?? 'Genre'

    const { data, isLoading, isError } = useFetchAnimeByGenreQuery(id ?? '')

    if (isLoading) return <LoadingSpinner />
    if (isError) return <ErrorMessage />

    return (
        <div>
            <PageHeader icon={Tag} title={genreName} />
            {data && data.data.length === 0 && (
                <p className="text-gray-400">Ingen anime fundet inden for denne genre.</p>
            )}

            {data && <AnimeGrid animes={data.data} />}
        </div>
    )
}

export default GenrePage