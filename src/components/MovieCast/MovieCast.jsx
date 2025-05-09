import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import fetchFilms from "../../films-api";
import MovieCastList from "../MovieCastList/MovieCastList";
import css from "./MovieCast.module.css";

const MovieCast = () => {
  const { movieId } = useParams();
  const [casts, setCast] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCasts = async () => {
      try {
        setIsLoading(true);
        setError(false);
        const castsData = await fetchFilms(`/movie/${movieId}/credits`);
        setCast(castsData.cast);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCasts();
  }, [movieId]);

  return (
    <>
      {isLoading && <p>Loading, please, wait...</p>}
      {error ? (
        <p className={css.error}>There is an error</p>
      ) : (
        <MovieCastList casts={casts} />
      )}
    </>
  );
};

export default MovieCast;
