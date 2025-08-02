import classes from './pokemon-detail.module.css';
import { usePokemonDetail } from './use-pokemon-detail';
import { Loader } from '..';
import { useBag } from '../../../shared/hooks/use-bag';

function PokemonDetail() {
  const { detail, isLoading, closeDetail } = usePokemonDetail();

  const addInBag = useBag((state) => state.addPokemon);
  const hasBag = useBag((state) => state.hasPokemon);

  if (isLoading) {
    return <Loader />;
  }

  if (!detail) {
    return null;
  }

  return (
    <section className={classes.container}>
      <button onClick={closeDetail} className={classes.button}>
        X
      </button>

      {!hasBag(detail.name) && (
        <button onClick={() => addInBag(detail)} className={classes.buttonBag}>
          bag
        </button>
      )}

      <div className="img">
        <div>
          <p className={classes.number}>{detail.id}</p>
          <h2>{detail.name}</h2>
          <p>{detail.types[0].type.name}</p>
        </div>
        <img src={detail.sprites.front_default} alt={detail.name} />
      </div>

      <ul>
        {detail.stats.map((item) => (
          <li key={detail.name + item.stat.name}>
            {item.stat.name}: {item.base_stat}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default PokemonDetail;
