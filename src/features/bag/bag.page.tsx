import classes from './bag.module.css';
import { BagList, BagMenu } from '.';

function Bag() {
  return (
    <main className="container">
      <div className={classes.container}>
        <h3>Bag page</h3>

        <BagMenu />

        <BagList />
      </div>
    </main>
  );
}

export const Component = Bag;
