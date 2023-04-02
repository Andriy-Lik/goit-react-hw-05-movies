import { useEffect, useState } from 'react';
import { fetchReviewsMovies } from '../../services/api';
import style from './Reviews.module.css';

const { useParams } = require('react-router-dom');

const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    const { movieId } = useParams();

    useEffect(() => {
        fetchReviewsMovies(movieId)
        .then(data => {
            setReviews(data.results);
        })
    }, [movieId]);

    return (
        <div className={style.Reviewssection}>
            <ul className={style.ReviewsList}>
                {reviews.length === 0 ? (
                    <p>We don't have any reviews for this movie!</p>
                ) : (
                    reviews.map(review => {
                    return (
                        <li key={review.id} className={style.ReviewsItem}>
                            <h2 className={style.ReviewsTitle}>Author: {review.author}</h2>
                            <p className={style.ReviewsContent}>{review.content}</p>
                        </li>
                    );
                }))}
            </ul>
        </div>
    );
};

export default Reviews;