import { useEffect, useState } from 'react';
import { Link, useSearchParams, useLocation } from 'react-router-dom';
import { fetchSearchMovie } from '../../services/api';
import style from './Movies.module.css';

const Movies = () => {
    const [movies, setMovies] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('query') ?? '';
    const location = useLocation();

    useEffect(() => {
        if (query === '') return;
        fetchSearchMovie(query)
        .then(data => {
            setMovies(data.results)
        })
    }, [query]);

    const handleSubmit = e => {
        e.preventDefault();
        const form = e.currentTarget;
        setSearchParams({ query: form.elements.searchmovie.value });
        form.reset();
    };

    // console.log(location);

    return (
        <div className={style.MoviesSection}>
            <form className={style.MoviesForm} onSubmit={handleSubmit}>
                <input type="text" name="searchmovie" className={style.MoviesInput} />
                <button type="submit" className={style.MoviesBtn}>Search</button>
            </form>
            <ul className={style.MoviesList}>
                {movies.map(movie => {
                    return (
                        <li className={style.MoviesItem} key={movie.id}>
                            <Link to={`${movie.id}`} state={{ from: location }}>{movie.title}</Link>
                        </li>
                    );
                })}
            </ul>
            
        </div>
    );
};

export default Movies;