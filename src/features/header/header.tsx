import classes from './header.module.css';
import Modal from './modal';
import { useState } from 'react';

function Header() {
  const [isShow, setShow] = useState(false);

  return (
    <header className={`container ${classes.header}`}>
      <button
        className={`${classes.button} ${isShow ? classes.active : ''}`}
        onClick={() => setShow(!isShow)}
      >
        ⚙️ settings
      </button>
      <h1 className={classes.title}>Perfomans App</h1>

      <Modal {...{ isShow, setShow }} />
    </header>
  );
}

export default Header;
