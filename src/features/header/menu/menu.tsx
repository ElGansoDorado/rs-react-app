'use client';
import classes from './menu.module.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ROUTES } from '@/shared/model/routes';
import { useTranslations } from 'next-intl';

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
  const pathname = usePathname();
  const t = useTranslations('Header');

  const isActive = (href: string) => {
    return pathname.includes(href);
  };

  return (
    <nav role="menu">
      <ul className={classes.menu}>
        {links.map((item, index) => (
          <li key={item.name}>
            <Link
              href={item.links}
              className={
                isActive(item.links)
                  ? `${classes.active} ${classes.item}`
                  : classes.item
              }
            >
              {t.raw('menu')[index]}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Menu;
