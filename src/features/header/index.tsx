import classes from './header.module.css';
import Search from './search/search';

function Header() {
  return (
    <header className={classes.header}>
      <div className={`container ${classes.container}`}>
        <h1 className={classes.title}>Pokemon list</h1>

        <Search />
      </div>
    </header>
  );
}

export default Header;
