import classes from './search.module.css';
import { useState } from 'react';
// import { ROUTES } from '@/shared/model/routes';
import { useLineSearch } from '@/shared/hooks/use-line-search';

function Search() {
  const { searchLine } = useLineSearch();
  const [search, setSearch] = useState(searchLine);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // if (trimmedSearch != '') {
    //   navigate(
    //     `${ROUTES.POKEMONS}?search=${encodeURIComponent(trimmedSearch)}`
    //   );
    //   setSearch(trimmedSearch);
    // } else {
    //   navigate(`${ROUTES.POKEMONS}?page=${1}`);
    // }
  };

  return (
    <form onSubmit={handleSubmit} className={classes.container} role="search">
      <input
        type="search"
        name="search"
        className={classes.search}
        placeholder="Search..."
        onChange={(e) => setSearch(e.target.value)}
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
