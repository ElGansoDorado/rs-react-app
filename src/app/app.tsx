import { Modal } from '@/features/form';
import { useUser } from '@/shared/store/useUser';
import { Header, Footer } from '@/shared/ui';

function App() {
  const list = useUser((state) => state.list);
  const clear = useUser((state) => state.clear);

  return (
    <>
      <Header />

      <Modal />
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
