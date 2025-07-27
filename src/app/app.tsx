import Header from '../features/header';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <>
      <Header />
      <Outlet />

      <footer className="footer">
        <p className="footer__text">@2025 Yakovchik Denis</p>
      </footer>
    </>
  );
}

export default App;
