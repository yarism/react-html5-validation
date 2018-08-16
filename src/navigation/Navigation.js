import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

const Navigation = ({listItems, path}) => {
  return (
    <nav className="navigation">
      <ul className="navigation__list">
        {listItems.map((item) => {
          return (
            <li className="navigation__list__item" key={item.id}>
              <Link className="navigation__link" to={path + item.id}>
                <img className="navigation__thumbnail" alt={item.firstName} src={item.photoUrl} />
                {item.firstName} {item.lastName}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  );
}

export default Navigation;