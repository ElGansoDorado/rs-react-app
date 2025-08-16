import classes from './header.module.css';
import { Menu, Search, ThemeSwitcher, LanguageSwitcher } from '.';

function Header() {
  return (
    <header className={classes.header}>
      <div className={`container ${classes.container}`}>
        <div className={classes.functional}>
          <LanguageSwitcher />
          <h1 className={classes.title}>Pokemon list</h1>
        </div>

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
