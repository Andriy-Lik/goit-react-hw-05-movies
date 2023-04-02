import { useEffect, useState } from 'react';
import { fetchCastMovies } from '../../services/api';
import noImage from '../../images/noImage.jpg';
import style from './Cast.module.css';

const { useParams } = require('react-router-dom');



const Cast = () => {
    const [cast, setCast] = useState([]);
    const { movieId } = useParams();

    useEffect(() => {
        fetchCastMovies(movieId)
        .then(data => {
            setCast(data.cast)
        })
    }, [movieId]);

    return (
        <div className={style.CastSection}>
            <ul className={style.CastList}>
                {cast.map(actor => {
                    return (
                        <li key={actor.id} className={style.CastItem}>
                            <img 
                            className={style.CastImg}
                            src={actor.profile_path === null ? noImage :`https://image.tmdb.org/t/p/w500/${actor.profile_path}`} 
                            alt={actor.name} 
                            width="198"
                            />
                            <div className={style.CastDescription}>
                                <h2 className={style.CastTitle}>{actor.name}</h2>
                                <p className={style.CastCharacter}>Character: {actor.character}</p>
                            </div>
                        </li>
                    );
                })}
            </ul>            
        </div>
    );
};

export default Cast;