import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom"
import { fetchTrendingMovies } from '../../services/api';
import style from './Home.module.css';

const Home = () => {

    const [trending, setTrending] = useState([]);
    const location = useLocation();

    useEffect (() => {
        fetchTrendingMovies().then(data => setTrending(data.results))
    }, [])
    

    return (
        <div className={style.Container}>
            <h1 className={style.HomeTitle}>Trending Today</h1>
            <ul>
                {trending.map((movie) => {
                    return (
                        <li key={movie.id} className={style.HomeItem}>
                            <Link to={`movies/${movie.id}`} state={{ from: location }}>{movie.title}</Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Home;