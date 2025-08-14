import classes from './header.module.css';
import { Menu, Search, ThemeSwitcher } from '.';

function Header() {
  return (
    <header className={classes.header}>
      <div className={`container ${classes.container}`}>
        <h1 className={classes.title}>Pokemon list</h1>

        <Menu />

        <div className={classes.functional}>
          <Search />
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
}

export default Header;
