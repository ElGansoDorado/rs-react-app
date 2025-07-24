import classes from './header.module.css';
import Search from './search/search';

export interface HeaderProps {
  searchPokemons: (search: string) => void;
}

function Header({ searchPokemons }: HeaderProps) {
  return (
    <header className={classes.header}>
      <div className={`container ${classes.container}`}>
        <h1 className={classes.title}>Pokemon list</h1>

        <Search {...{ searchPokemons }} />
      </div>
    </header>
  );
}

export default Header;
