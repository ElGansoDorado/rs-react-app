import { useUser } from '@/shared/store/useUser';

function Main() {
  const list = useUser((state) => state.list);
  const clear = useUser((state) => state.clear);

  return (
    <main className="container">
      {list.map((item) => (
        <div key={item.email}>
          <h3>{item.username}</h3>
          <img className="app__img" src={item.img} alt={item.username} />
        </div>
      ))}
      <button onClick={clear}>Clear list</button>
    </main>
  );
}

export default Main;
