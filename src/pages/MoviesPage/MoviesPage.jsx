import { Field, Form, Formik } from "formik";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import fetchFilms from "../../films-api";
import MovieList from "../../components/MovieList/MovieList";
import css from "./MoviesPage.module.css";

const initialValues = {
  filmName: "",
};

const MoviesPage = () => {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [films, setFilms] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [filmName, setFilmName] = useState(searchParams.get("query") || "");

  const updateSearchParams = (key, value) => {
    const copyParams = new URLSearchParams(searchParams);
    copyParams.set(key, value);
    setSearchParams(copyParams);
  };

  const handleSubmit = (values, actions) => {
    setFilmName(values.filmName.trim());
    updateSearchParams("query", values.filmName.trim());
    actions.resetForm();
  };

  useEffect(() => {
    const fetchFilmsByNane = async () => {
      if (!filmName) {
        return;
      }
      try {
        setFilms([]);
        setIsLoading(true);
        setError(false);
        const filmsData = await fetchFilms("/search/movie", {
          query: filmName,
        });
        setFilms(filmsData.results);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFilmsByNane();
  }, [filmName]);

  return (
    <>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form>
          <Field type="text" name="filmName" className={css.input} />
          <button type="submit" className={css.btn}>
            Search
          </button>
        </Form>
      </Formik>
      {isLoading && <p>Loading, please, wait...</p>}
      {error && <p className={css.error}>There is an error</p>}
      {!error && films && <MovieList films={films} />}
    </>
  );
};

export default MoviesPage;
