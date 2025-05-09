import { useEffect, useState } from "react";
import css from "./HomePage.module.css";
import fetchFilms from "../../films-api";
import MovieList from "../../components/MovieList/MovieList";

const HomePage = () => {
  const [films, setFilms] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTrendingFilms = async () => {
      try {
        setIsLoading(true);
        setError(false);
        const filmsData = await fetchFilms("/trending/movie/day");
        setFilms(filmsData.results);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTrendingFilms();
  }, []);

  return (
    <div>
      <h1 className={css.title}>Trending today</h1>
      {isLoading && <p>Loading, please, wait...</p>}
      {error ? (
        <p className={css.error}>There is an error</p>
      ) : (
        <MovieList films={films} />
      )}
    </div>
  );
};

export default HomePage;
