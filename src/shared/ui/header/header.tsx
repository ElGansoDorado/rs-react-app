import classes from './header.module.css';

function Header() {
  return (
    <header className={classes.header}>
      <div className={`container ${classes.container}`}>
        <h1 className={classes.title}>Forms App</h1>
      </div>
    </header>
  );
}

export default Header;
