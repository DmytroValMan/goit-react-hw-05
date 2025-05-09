import { NavLink } from "react-router-dom";
import clsx from "clsx";

import css from "./Navigation.module.css";

const Navigation = () => {
  return (
    <nav className={css.nav}>
      <NavLink
        to="/"
        className={({ isActive }) => clsx(css.link, isActive && css.active)}
      >
        Home
      </NavLink>
      <NavLink
        to="/movies"
        className={({ isActive }) => clsx(css.link, isActive && css.active)}
      >
        Movies
      </NavLink>
    </nav>
  );
};

export default Navigation;
