import classes from './pagination.module.css';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPokemonNumberPage } from '@/shared/api/get-pokemon';

function Pagination() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);
  const [max, setMax] = useState(0);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setPage(value > max ? max : value);
  };

  const switchPage = (value: number) => {
    if (page + value < 1 || page + value > max) {
      return;
    }

    setPage((prev) => prev + value);
  };

  useEffect(() => {
    const fetchMaxPage = async () => {
      try {
        setMax(await getPokemonNumberPage());
      } catch (error) {
        console.error('Failed to fetch max page:', error);
        setMax(66);
      }
    };

    fetchMaxPage();
  }, []);

  useEffect(() => {
    const params = Object.fromEntries(searchParams);
    setSearchParams({ ...params, page: `${page}` });
  }, [page]);

  if (!searchParams.has('page')) {
    return null;
  }

  return (
    <form className={classes.container} onSubmit={handleSubmit}>
      <button disabled={page === 1} onClick={() => setPage(1)}>
        {'<<'}
      </button>
      <button disabled={page < 11} onClick={() => switchPage(-10)}>
        {'<'}
      </button>

      <input
        className={classes.input}
        type="number"
        value={page}
        onChange={changeInput}
        min="1"
        max={max}
      />

      <button disabled={page > max - 11} onClick={() => switchPage(10)}>
        {'>'}
      </button>
      <button disabled={page === max} onClick={() => setPage(max)}>
        {'>>'}
      </button>
    </form>
  );
}

export default Pagination;
