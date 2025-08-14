import classes from './bag.module.css';
import { BagList, ExportControls } from '.';

function Bag() {
  return (
    <main className="container">
      <div className={classes.container}>
        <h3 className={classes.title}>Bag page</h3>

        <ExportControls />

        <BagList />
      </div>
    </main>
  );
}

export default Bag;
