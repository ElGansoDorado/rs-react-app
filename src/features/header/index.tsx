import classes from './header.module.css';
import Search from './search/search';
// import Menu from './menu/menu';
import { useTheme } from '@/shared/hooks/use-theme';
import Image from 'next/image';

function Header() {
  const { theme, toggleTheme } = useTheme();
  return (
    <header className={classes.header}>
      <div className={`container ${classes.container}`}>
        <h1 className={classes.title}>Pokemon list</h1>

        {/* <Menu /> */}

        <div className={classes.functional}>
          <Search />

          <button onClick={toggleTheme}>
            <Image
              src={
                theme === 'dark'
                  ? 'https://www.svgrepo.com/show/529971/sun-2.svg'
                  : 'https://www.svgrepo.com/show/529729/moon.svg'
              }
              alt="toggle theme img"
              width={24}
              height={24}
              className={classes.icon}
            />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
