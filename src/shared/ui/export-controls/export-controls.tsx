import classes from './export-controls.module.css';
import { useBag } from '@/shared/hooks/use-bag';
import { useCSVDowload } from './use-csv-dowload';

function ExportControls() {
  const list = useBag((state) => state.list);
  const clear = useBag((state) => state.clear);

  const { downloadLinkRef, exportToCSV } = useCSVDowload();

  const handleDownloadClick = () => {
    exportToCSV(list);
    clear();
  };

  return (
    <div className={classes.menu}>
      <p>selected items: {list.length}</p>
      <div className={classes.Box}>
        <button className={classes.button} onClick={() => clear()}>
          <img
            src="https://www.svgrepo.com/show/502608/delete-2.svg"
            alt="clear"
          />
        </button>
        <button className={classes.button} onClick={handleDownloadClick}>
          <img
            src="https://www.svgrepo.com/show/525323/download-square.svg"
            alt="dowload"
          />
        </button>
        <a ref={downloadLinkRef} style={{ display: 'none' }} />
      </div>
    </div>
  );
}

export default ExportControls;
