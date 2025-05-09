import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import fetchFilms from "../../films-api";
import MovieReviewsList from "../MovieReviewsList/MovieReviewsList";
import css from "./MovieReviews.module.css";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setIsLoading(true);
        setError(false);
        const reviewsData = await fetchFilms(`/movie/${movieId}/reviews`);
        setReviews(reviewsData.results);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchReviews();
  }, [movieId]);

  return (
    <>
      {isLoading && <p>Loading, please, wait...</p>}
      {error && <p className={css.error}>There is an error</p>}
      {reviews.length === 0 && <p>We don't have reviews for this movie</p>}
      {!error && reviews.length > 0 && <MovieReviewsList reviews={reviews} />}
    </>
  );
};

export default MovieReviews;
