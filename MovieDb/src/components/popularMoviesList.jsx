import { useFetchPopularMoviesQuery } from "../store";
import MovieCard from "./movieCard"

// Dette component er ansvarlig for at vise en liste af populære film. 
// Det gør det ved at bruge den auto-genererede hook useFetchPopularMoviesQuery, som er oprettet i moviesApi. 
// Når komponenten bliver rendered, vil hooken automatisk udføre en API-forespørgsel for at hente de populære film og returnere data, fejl og indlæsningsstatus. 
// Baseret på disse værdier vil komponenten vise enten en indlæsningsmeddelelse, en fejlmeddelelse eller en liste af MovieCard-komponenter, der repræsenterer hver film i dataresultatet.

function PopularMoviesList() {                                   //Bemærk Query-function kaldes automatisk når komponenten bliver displayed
    const { data, error, isFetching } = useFetchPopularMoviesQuery();    //kaldet vil straks hente data i et result-objekt, som vi "destructure" til data, error og isLoading
    //Bemærk Mutation-function returnere et array med en function, som kan kaldes når data skal ændres
    //console.log(data, error, isFetching);                        //samt et objekt results der er meget tilsvarende det der returneres fra et Query-function kald
    //til start er results objektet "uinitialiseret", efter kaldet af funktionen vil det indeholde mange flere properties
    //med relevante værdier fx data, isSucces/isError mm
    let content;
    if (isFetching) {
        content = <div>Loading;</div>
    } else if (error) {
        content = <div>Error loading movies.</div>;
    } else {
        content = data.results.map((movie) => {
            return <MovieCard key={movie.id} movie={movie}></MovieCard> // Vi bruger movie.id som key, da det er en unik identifier for hver film, og det hjælper React med at optimere rendering ved at identificere hvilke elementer der har ændret sig, tilføjet eller fjernet. Vi sender hele movie-objektet som prop til MovieCard-komponenten, så den kan få adgang til alle nødvendige oplysninger om filmen for at vise dem korrekt.
        });
    }
    return (
        <div className="row row-cols-3 row-cols-md-2 m-4">
            {content}
        </div>
    );
}
export default PopularMoviesList;