import classes from './header.module.css';
import { Button } from '..';
import { useShowForm } from '@/shared/store';

function Header() {
  const toggleShowOne = useShowForm((state) => state.showFormOne);
  const toggleShowTwo = useShowForm((state) => state.showFormTwo);

  return (
    <header className={classes.header}>
      <div className={`container ${classes.container}`}>
        <h1 className={classes.title}>Forms App</h1>

        <div className={classes.functional}>
          <Button name="form hook" onClick={toggleShowOne} />
          <Button name="form ref" onClick={toggleShowTwo} />
        </div>
      </div>
    </header>
  );
}

export default Header;
