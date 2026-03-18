// Dette component er ansvarlig for at vise en enkelt film i form af et kort. 
// Det modtager en "movie" prop, som indeholder alle nødvendige oplysninger om filmen, såsom titel, poster, vurdering, oversigt og udgivelsesdato. 
// Kortet er designet ved hjælp af Bootstrap-klasser for at give det et pænt og responsivt layout.

function MovieCard({ movie }) {
    const posterBasePath = 'https://image.tmdb.org/t/p/w185'; // Base URL for movie poster images with a width of 185 pixels
    return (
        <div className="col-lg-2 mb-4">
            <div className="card">
                <img src={posterBasePath + movie.poster_path} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title "><span>{movie.title.substring(0, 200)}</span></h5><span className="far fa-star" aria-hidden="true"></span><span className="ml-1">{movie.vote_average}</span>
                    <p className="card-text">{movie.overview.substring(0, 125).concat('....')}</p>
                    <div className="d-flex justify-content-between p-0"><span className="far fa-calendar" aria-hidden="true"> {movie.release_date}</span><span className="far fa-play-circle"></span></div>
                </div>
            </div>
        </div>
    );
}



export default MovieCard;