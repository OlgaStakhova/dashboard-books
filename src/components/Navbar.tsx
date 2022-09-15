import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import { FC } from 'react';

export const Navbar: FC = () => {
  return (
    <nav
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink
            className={({ isActive }) => cn(
              'navbar-item',
              { 'has-background-grey-lighter': isActive },
            )}
            to="/"
          >
            Dashboard
          </NavLink>
          <NavLink
            className={({ isActive }) => cn(
              'navbar-item',
              { 'has-background-grey-lighter': isActive },
            )}
            to="/add-book"
          >
            Add a Book
          </NavLink>
        </div>
      </div>
    </nav>
  );
};