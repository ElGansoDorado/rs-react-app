import classes from './pokemon-detail.module.css';
import { usePokemonDetail } from './usePokemonDetail';
import { Loader } from '..';

function PokemonDetail() {
  const { detail, isLoading, closeDetail } = usePokemonDetail();

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

      <div className="img">
        <h2>{detail?.name}</h2>
        <img src={detail?.sprites.front_default} alt={detail?.name} />
      </div>

      <ul>
        {detail?.stats.map((item) => (
          <li key={detail.name + item.stat.name}>
            {item.stat.name}: {item.base_stat}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default PokemonDetail;
