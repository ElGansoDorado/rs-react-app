import classes from './header.module.css';
import { Button } from '..';

type Props = {
  onClick?: () => void;
};

function Header({ onClick }: Props) {
  return (
    <header className={classes.header}>
      <div className={`container ${classes.container}`}>
        <h1 className={classes.title}>Forms App</h1>

        <div className={classes.functional}>
          <Button name="form one" {...{ onClick }} />
          <Button name="form two" />
        </div>
      </div>
    </header>
  );
}

export default Header;
