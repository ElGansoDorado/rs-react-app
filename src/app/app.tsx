import Header from '@/features/header';
import { Modal, ExportControls } from '@/shared/ui';
// import { useBag } from '@/shared/hooks/use-bag';
import { ThemeProvider } from './providers/theme-provider';

function App() {
  // const length = useBag((state) => state.list.length);

  return (
    <ThemeProvider>
      <div className={`color light`}>
        <Header />

        <Modal show>
          <ExportControls />
        </Modal>

        <footer className="footer">
          <p className="footer__text">@2025 Yakovchik Denis</p>
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default App;
