import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <>
      <p>There is no such page!</p>
      <Link to="/">Go to home page</Link>
    </>
  );
};

export default NotFoundPage;
