import { useConfig } from '@/shared/store/use-config';
import classes from './header.module.css';
import Modal from './modal';
import { useState } from 'react';

function Header() {
  const [isShow, setShow] = useState(false);
  const setSearch = useConfig((state) => state.setSearch);
  const setYear = useConfig((state) => state.setYear);

  return (
    <header className={`container ${classes.header}`}>
      <div className={classes.functional}>
        <input
          type="search"
          className={classes.search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          placeholder="search..."
        />

        <input
          className={classes.search}
          type="number"
          min="1750"
          max="2023"
          defaultValue="2023"
          onChange={(e) => setYear(+e.target.value)}
        />
      </div>

      <h1 className={classes.title}>Perfomans App</h1>

      <button
        className={`${classes.button} ${isShow ? classes.active : ''}`}
        onClick={() => setShow(!isShow)}
      >
        ⚙️ settings
      </button>

      {isShow && <Modal onClose={() => setShow(false)} />}
    </header>
  );
}

export default Header;
