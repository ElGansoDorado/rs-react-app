import classes from './pokemon-detail.module.css';
import { useFetchPokemonDetail } from './queries';
import { useBag } from '@/shared/hooks/use-bag';
import { Loader } from '..';

function PokemonDetail() {
  const { detail, isLoading, closeDetail } = useFetchPokemonDetail();

  const addInBag = useBag((state) => state.addPokemon);
  const list = useBag((state) => state.list);

  if (isLoading) {
    return <Loader />;
  }

  if (!detail) {
    return (
      <div className={classes.container}>
        <p className={classes.card}>
          Pokemon details were not found, maybe it hasn t been added yet...
        </p>
      </div>
    );
  }

  return (
    <section className={classes.container}>
      <div className={classes.card}>
        <div className="img">
          <div className={classes.type}>
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
      </div>

      <div className={classes.menu}>
        <button onClick={closeDetail} className={classes.button} role="close">
          <img
            src="https://www.svgrepo.com/show/525281/close-circle.svg"
            alt="close"
          />
        </button>

        <button
          onClick={() => addInBag(detail)}
          className={classes.button}
          role="add"
        >
          <img
            src={
              !list.some((pokemon) => pokemon.name === detail.name)
                ? 'https://www.svgrepo.com/show/525643/bag-2.svg'
                : 'https://www.svgrepo.com/show/525648/bag-cross.svg'
            }
            alt="bag img"
          />
        </button>
      </div>
    </section>
  );
}

export default PokemonDetail;
