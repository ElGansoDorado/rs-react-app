import { Modal } from '@/features/form';
import { useUser } from '@/shared/store/useUser';
import { Header, Footer } from '@/shared/ui';

import { useState } from 'react';

function App() {
  const list = useUser((state) => state.list);
  const clear = useUser((state) => state.clear);
  const [isShow, setIsShow] = useState(false);

  const toggleFormShow = () => {
    setIsShow(!isShow);
  };

  return (
    <>
      <Header onClick={toggleFormShow} />

      <Modal {...{ isShow }} />
      <main className="container">
        {list.map((item) => (
          <div key={item.email}>
            <h3>{item.username}</h3>
            <img className="app__img" src={item.img} alt={item.username} />
          </div>
        ))}
        <button onClick={clear}>Clear list</button>
      </main>

      <Footer />
    </>
  );
}

export default App;
