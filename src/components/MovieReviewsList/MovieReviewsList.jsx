import css from "./MovieReviewsList.module.css";

const MovieReviewsList = ({ reviews }) => {
  return (
    <ul className={css.list}>
      {reviews.map((review) => {
        return (
          <li key={review.id} className={css.item}>
            <h3 className={css.title}>
              Author: {review.author_details.username}
            </h3>
            <p>{review.content}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default MovieReviewsList;
