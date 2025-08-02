import classes from './pokemon-detail.module.css';
import { usePokemonDetail } from './use-pokemon-detail';
import { Loader } from '..';
import { useBag } from '../../../shared/hooks/use-bag';
import { useState, useEffect } from 'react';

function PokemonDetail() {
  const { detail, isLoading, closeDetail } = usePokemonDetail();

  const addInBag = useBag((state) => state.addPokemon);
  const hasBag = useBag((state) => state.hasPokemon);
  const [isInBag, setIsInBag] = useState(hasBag(detail?.name ?? ''));

  const handleBagClick = () => {
    if (detail) {
      setIsInBag(!isInBag);
      addInBag(detail);
    }
  };

  useEffect(() => {
    setIsInBag(hasBag(detail?.name ?? ''));
  }, [detail]);

  if (isLoading) {
    return <Loader />;
  }

  if (!detail) {
    return null;
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
        <button onClick={closeDetail} className={classes.button}>
          <img
            src="https://www.svgrepo.com/show/525281/close-circle.svg"
            alt="close"
          />
        </button>

        <button onClick={handleBagClick} className={classes.button}>
          <img
            src={
              !isInBag
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
