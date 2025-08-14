'use client';
import classes from './pagination.module.css';
import { usePagination } from './use-pagination';

type Props = {
  max: number;
};

function Pagination({ max }: Props) {
  const { page, setPage, switchPage } = usePagination(max);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setPage(value > max ? max : value);
  };

  return (
    <form
      className={classes.container}
      onSubmit={handleSubmit}
      role="pagination"
    >
      <button disabled={page === 1} onClick={() => setPage(1)}>
        {'<<'}
      </button>
      <button disabled={page < 11} onClick={() => switchPage(-10)}>
        {'<'}
      </button>

      <input
        name="page-input"
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
