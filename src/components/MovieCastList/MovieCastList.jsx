import css from "./MovieCastList.module.css";

const MovieCastList = ({ casts }) => {
  return (
    <ul>
      {casts.map((cast) => {
        return (
          <li key={cast.id} className={css.item}>
            <div className={css.imgWrapper}>
              <img
                src={`https://image.tmdb.org/t/p/w500/${cast.profile_path}`}
                alt={cast.name}
              ></img>
            </div>
            <p className={css.name}>{cast.original_name}</p>
            <p>Character: {cast.character}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default MovieCastList;
