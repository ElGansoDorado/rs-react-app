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
      <ul className="menu">
        {links.map((item) => (
          <li key={item.name}>
            <NavLink
              to={item.links}
              className={({ isActive }) =>
                isActive ? 'menu__item menu__item-active' : 'menu__item'
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
