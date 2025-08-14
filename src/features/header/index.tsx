import classes from './header.module.css';
import Search from './search/search';
import Menu from './menu/menu';
import ThemeSwitcher from './theme-switcher';

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
