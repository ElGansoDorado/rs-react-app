import classes from './pagination.module.css';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/shared/model/routes';

function Pagination() {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const max = 65;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    navigate(`${ROUTES.POKEMONS}?page=${page}`);
  };

  const switchPage = (value: number) => {
    if (page + value < 1 || page + value > max) {
      return;
    }

    setPage((prev) => prev + value);
  };

  return (
    <form className={classes.container} onSubmit={handleSubmit}>
      <button onClick={() => setPage(1)}>start</button>
      <button onClick={() => switchPage(-10)}>-10</button>
      <button onClick={() => switchPage(-1)}>-1</button>

      <input
        type="number"
        value={page}
        onChange={(e) => setPage(Number(e.target.value))}
        min="1"
        max={max}
      />

      <button onClick={() => switchPage(1)}>+1</button>
      <button onClick={() => switchPage(10)}>+10</button>
      <button onClick={() => setPage(65)}>end</button>
    </form>
  );
}

export default Pagination;
