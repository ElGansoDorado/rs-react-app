import { useConfig } from '@/shared/store/use-config';
import classes from './header.module.css';
import Modal from './modal';
import { useState } from 'react';

function Header() {
  const [isShow, setShow] = useState(false);
  const setSearch = useConfig((state) => state.updateSearch);

  return (
    <header className={`container ${classes.header}`}>
      <input
        type="search"
        className={classes.search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        placeholder="search..."
      />

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
