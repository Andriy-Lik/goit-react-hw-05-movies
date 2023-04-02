import { useState, useEffect, useRef, Suspense } from "react";
import { Link, NavLink, Outlet, useLocation, useParams } from "react-router-dom";
import { fetchDetailsMovies } from '../../services/api';
import style from './MovieDetails.module.css';
import { BiLeftArrowCircle } from "react-icons/bi";
// import imgNotFound from '../../images/noImage.jpg';

const MovieDetails = () => {
    const [details, setDetails] = useState({});
    const [genres, setGenres] = useState('');
    const [year, setYear] = useState('');
    const location = useLocation();
    const backLinkLocationRef = useRef(location.state?.from ?? '/');
    const { movieId } = useParams();

    useEffect (() => {
        fetchDetailsMovies(movieId)
        .then(data => {
            setDetails(data);
            setGenres((data.genres.map(genre => genre.name)).join(' ~ '));
            setYear(data.release_date)
        });
    }, [movieId]);

    const voteAverage = Math.round(details.vote_average * 10);
        
    return (
        <div className={style.Container}>
            <div className={style.BackLink}>
                <BiLeftArrowCircle className={style.BackLinkIcon} />
                <Link to={backLinkLocationRef.current}>Go back</Link>
            </div>
                
            <div className={style.Movie}>
                <img
                    className={style.MovieImg} 
                    src={`https://image.tmdb.org/t/p/w500/${details.poster_path}`} 
                    alt={details.title} 
                    width="200"
                />
                <div className={style.MovieFeature}>
                    <h2 className={style.MovieTitle}>{details.title} ({year.substring(0, 4)})</h2>
                    <p className={style.MovieScore}>User Score: {voteAverage}%</p>
                    <h2 className={style.MovieTitleOverview}>Overview</h2>
                    <p className={style.MovieOverview}>{details.overview}</p>
                    <h2 className={style.MovieTitleGenres}>Genres</h2>
                    <p className={style.MovieGenres}>{genres}</p>
                </div>
            </div>
            <div className={style.MovieInfo}>
                <h2 className={style.MovieInfoTitle}>Additional information</h2>
                <ul>
                    <li className={style.MovieInfoItem}>
                        <NavLink to="cast" >Cast</NavLink>
                    </li>
                    <li className={style.MovieInfoItem}>
                        <NavLink to="reviews">Reviews</NavLink>
                    </li>
                </ul>
            </div>
            <Suspense fallback={<div>Loading...</div>}>
                <Outlet />
            </Suspense>
        </div>
    );
};

export default MovieDetails;