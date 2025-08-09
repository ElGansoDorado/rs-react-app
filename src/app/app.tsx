import Header from '@/features/header';
import { Modal, ExportControls } from '@/shared/ui';
import { Outlet } from 'react-router-dom';
import { useTheme } from '@/shared/hooks/use-theme';
import { useBag } from '@/shared/hooks/use-bag';
import { queryClient } from '@/shared/api/query-client';

function App() {
  const length = useBag((state) => state.list.length);
  const { theme } = useTheme();

  return (
    <div className={`color ${theme}`}>
      <Header />
      <Outlet />

      <Modal show={length > 0}>
        <ExportControls />
      </Modal>

      <button className="button-error" onClick={() => queryClient.clear()}>
        clear cache
      </button>

      <footer className="footer">
        <p className="footer__text">@2025 Yakovchik Denis</p>
      </footer>
    </div>
  );
}

export default App;
