import MovieImg from '../assets/Image/movie_black2.jpg';

function Home() {
    return (
        <div className='container text-center'>
            <img className="rounded movie_img" src={MovieImg} alt="Movie" />
            <h1>Velkommen til startsiden</h1>
        </div>
    )
}

export default Home;