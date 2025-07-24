import classes from './search.module.css';
import { getLineSearch } from '@/shared/api/search-save';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/shared/model/routes';

function Search() {
  const [search, setSearch] = useState(getLineSearch());
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    navigate(`${ROUTES.POKEMONS}?search=${encodeURIComponent(search)}`);
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
