import Header from '../features/header';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default App;
