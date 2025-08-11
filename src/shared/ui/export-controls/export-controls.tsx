import classes from './export-controls.module.css';
import { useBag } from '@/shared/hooks/use-bag';
import { useCSVDowload } from './use-csv-dowload';
import Image from 'next/image';

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
          <Image
            src={'https://www.svgrepo.com/show/502608/delete-2.svg'}
            alt="clear"
            width={24}
            height={24}
            className={classes.icon}
          />
        </button>
        <button className={classes.button} onClick={handleDownloadClick}>
          <Image
            src={'https://www.svgrepo.com/show/525323/download-square.svg'}
            alt="download"
            width={24}
            height={24}
            className={classes.icon}
          />
        </button>
        <a ref={downloadLinkRef} style={{ display: 'none' }} />
      </div>
    </div>
  );
}

export default ExportControls;
