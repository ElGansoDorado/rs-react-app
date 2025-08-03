import { useBag } from '../shared/hooks/use-bag';
import Header from '../features/header';
import { Outlet } from 'react-router-dom';
import Modal from '../shared/ui/modal/modal';
import ExportControls from '../shared/ui/export-controls/export-controls';
import { useTheme } from '../shared/hooks/use-theme';

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

      <footer className="footer">
        <p className="footer__text">@2025 Yakovchik Denis</p>
      </footer>
    </div>
  );
}

export default App;
