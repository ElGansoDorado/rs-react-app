import classes from './bag-menu.module.css';
import { useBag } from '@/shared/hooks/use-bag';
import { useCSVDowload } from './use-csv-dowload';

function BagMenu() {
  const list = useBag((state) => state.list);
  const clear = useBag((state) => state.clear);

  const { downloadLinkRef, exportToCSV } = useCSVDowload();

  return (
    <div className={classes.menu}>
      <p>count: {list.length}</p>
      <div className={classes.buttonBox}>
        <button className="button" onClick={() => clear()}>
          remove
        </button>
        <button className="button" onClick={() => exportToCSV(list)}>
          download
        </button>
        <a ref={downloadLinkRef} style={{ display: 'none' }} />
      </div>
    </div>
  );
}

export default BagMenu;
