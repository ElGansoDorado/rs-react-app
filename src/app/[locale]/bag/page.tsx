import classes from './bag.module.css';
import { ExportControls } from '@/shared/ui';
import { BagList } from '@/features/bag';

function BagPage() {
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

export default BagPage;
