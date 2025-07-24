import classes from './search.module.css';
import { getLineSearch } from '@/shared/api/search-save';
import { useState } from 'react';
import { type HeaderProps } from '..';

function Search({ searchPokemons }: HeaderProps) {
  const [search, setSearch] = useState(getLineSearch());

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    searchPokemons(search);
  };

  return (
    <form onSubmit={handleSubmit} className={classes.container} role="search">
      <input
        type="search"
        name="search"
        className={classes.search}
        placeholder="Search..."
        onChange={(e) => setSearch(e.target.value.trim())}
        value={search}
      />

      <input
        type="submit"
        name="search-button"
        value="search"
        className={classes.button}
      />
    </form>
  );
}

export default Search;
