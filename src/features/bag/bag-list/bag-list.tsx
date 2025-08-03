import classes from './bag-list.module.css';
import { useBag } from '../../../shared/hooks/use-bag';
import { BagCard } from '..';

function BagList() {
  const list = useBag((state) => state.list);
  const removePokemon = useBag((state) => state.removePokemon);

  return (
    <div className={classes.list}>
      {list.length > 0 ? (
        list.map((item) => (
          <BagCard key={item.name} pokemon={item} close={removePokemon} />
        ))
      ) : (
        <p>Your inventory is empty, it s time to catch new Pokemon!</p>
      )}
    </div>
  );
}

export default BagList;
