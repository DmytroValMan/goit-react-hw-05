import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { Suspense, useEffect, useState } from "react";
import fetchFilms from "../../films-api";
import css from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [film, setFilm] = useState({});
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFilm = async () => {
      try {
        setIsLoading(true);
        setError(false);
        const filmData = await fetchFilms(`/movie/${movieId}`);
        setFilm(filmData);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFilm();
  }, [movieId]);

  return (
    <>
      {error ? (
        <p className={css.error}>There is an error</p>
      ) : (
        <div>
          {isLoading && <p>Loading, please, wait...</p>}
          <div>
            <button onClick={() => navigate(location.state ?? "/movies")}>
              Go back
            </button>
          </div>
          <div className={css.detailsWrapper}>
            <div>
              <img
                src={`https://image.tmdb.org/t/p/w500/${film.backdrop_path}`}
                alt={film.original_title}
                className={css.img}
              ></img>
            </div>
            <div>
              <h2 className={css.title}>{film.original_title}</h2>
              <p className={css.score}>
                User score: {Math.round(film.popularity)}%
              </p>
              <div className={css.overvieWrapper}>
                <h3 className={css.subtitle}>Overview</h3>
                <p>{film.overview}</p>
              </div>
              <div>
                <h3 className={css.subtitle}>Genres</h3>
                <p>
                  {film.genres &&
                    film.genres.map((genre) => genre.name).join(" ")}
                </p>
              </div>
            </div>
          </div>

          <div className={css.additionalWrapper}>
            <p>Additional info</p>
            <ul className={css.list}>
              <li>
                <Link to="cast" state={location.state ?? "/movies"}>
                  Cast
                </Link>
              </li>
              <li>
                <Link to="reviews" state={location.state ?? "/movies"}>
                  Reviews
                </Link>
              </li>
            </ul>
          </div>
          <Suspense fallback={<p>Loading, please, wait...</p>}>
            <Outlet />
          </Suspense>
        </div>
      )}
    </>
  );
};

export default MovieDetailsPage;
