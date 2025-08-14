'use client';
import classes from './menu.module.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ROUTES } from '@/shared/model/routes';

const links = [
  {
    name: 'About',
    links: ROUTES.ABOUT,
    exact: true,
  },
  {
    name: 'Pokedex',
    links: ROUTES.POKEMONS + '?page=1',
    exact: false,
  },
  {
    name: 'Bag',
    links: ROUTES.BAG,
    exact: true,
  },
];

function Menu() {
  const pathname = usePathname();

  const isActive = (href: string, exact: boolean) => {
    if (exact) {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <nav role="menu">
      <ul className={classes.menu}>
        {links.map((item) => (
          <li key={item.name}>
            <Link
              href={item.links}
              className={
                isActive(item.links, item.exact)
                  ? `${classes.active} ${classes.item}`
                  : classes.item
              }
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Menu;
