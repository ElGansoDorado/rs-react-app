import classes from './pagination.module.css';
import { usePagination } from './use-pagination';

function Pagination() {
  const { page, maxPage, setPage, switchPage, hasPageParam } = usePagination();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setPage(value > maxPage ? maxPage : value);
  };

  if (hasPageParam) {
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
        max={maxPage}
      />

      <button disabled={page > maxPage - 11} onClick={() => switchPage(10)}>
        {'>'}
      </button>
      <button disabled={page === maxPage} onClick={() => setPage(maxPage)}>
        {'>>'}
      </button>
    </form>
  );
}

export default Pagination;
