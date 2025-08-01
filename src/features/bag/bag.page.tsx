import classes from './bag.module.css';
import { useBag } from '@/shared/hooks/use-bag';
import { BagCard } from '.';

function Bag() {
  const list = useBag((state) => state.list);
  const clear = useBag((state) => state.clear);
  const removePokemon = useBag((state) => state.removePokemon);

  return (
    <main className="container">
      <div className={classes.container}>
        <h3>Bag page</h3>
        <div className={classes.menu}>
          <p>count: {list.length}</p>
          <div>
            <button className="button" onClick={() => clear()}>
              remove
            </button>
            <button className="button">download</button>
          </div>
        </div>
        <div className={classes.list}>
          {list.length > 0 ? (
            list.map((item) => (
              <BagCard key={item.name} pokemon={item} close={removePokemon} />
            ))
          ) : (
            <p>Your inventory is empty, it s time to catch new Pokemon!</p>
          )}
        </div>
      </div>
    </main>
  );
}

export const Component = Bag;
