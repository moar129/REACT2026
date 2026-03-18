import { useFetchHighestRatedMoviesQuery } from "../store/apis/moviesApi";
import MovieCard from "./movieCard"


function HighestRatedMoviesList() {
    const { data, error, isFetching } = useFetchHighestRatedMoviesQuery();
    let content;
    if (isFetching) {
        content = <div>Loading;</div>
    } else if (error) {
        content = <div>Error loading movies.</div>;
    } else {
        content = data.results
        .filter(movie => movie.poster_path !== null && movie.vote_average !== 0) // Filter out movies without a poster or with a vote average of 0
        .map((movie) => {
            return <MovieCard key={movie.id} movie={movie}></MovieCard>
        }); // Map over the filtered results to create MovieCard components for each movie, using movie.id as the key and passing the entire movie object as a prop to MovieCard
    }
    return (
        <div className="row row-cols-3 row-cols-md-2 m-4">
            {content}
        </div>
    );
}
export default HighestRatedMoviesList;