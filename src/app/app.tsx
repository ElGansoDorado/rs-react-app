import { Modal } from '@/features/form';
import { Header, Footer } from '@/shared/ui';

import { useState } from 'react';

function App() {
  const [isShow, setIsShow] = useState(false);

  const toggleFormShow = () => {
    setIsShow(!isShow);
  };

  return (
    <>
      <Header onClick={toggleFormShow} />

      <main className="container">
        <Modal {...{ isShow }} />
      </main>

      <Footer />
    </>
  );
}

export default App;
