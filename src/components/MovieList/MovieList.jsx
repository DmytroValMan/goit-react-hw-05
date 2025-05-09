import { Link, useLocation } from "react-router-dom";
import css from "./MovieList.module.css";

const MovieList = ({ films }) => {
  const location = useLocation();
  return (
    <ul className={css.list}>
      {films.map((film) => {
        return (
          <li key={film.id} className={css.item}>
            <Link to={`/movies/${film.id}`} state={location}>
              {film.title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default MovieList;
