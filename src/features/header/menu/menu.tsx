import classes from './menu.module.css';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../../shared/model/routes';

const links = [
  {
    name: 'About',
    links: ROUTES.ABOUT,
  },
  {
    name: 'Pokedex',
    links: ROUTES.POKEMONS,
  },
  {
    name: 'Bag',
    links: ROUTES.BAG,
  },
];

function Menu() {
  return (
    <nav role="menu">
      <ul className={classes.menu}>
        {links.map((item) => (
          <li key={item.name}>
            <NavLink
              to={item.links}
              className={({ isActive }) =>
                isActive ? `${classes.item} ${classes.active}` : classes.item
              }
            >
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Menu;
