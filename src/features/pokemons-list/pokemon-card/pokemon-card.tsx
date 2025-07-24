import classes from './pokemon-card.module.css';
import type { PokemonType } from '../../../shared/model/pokemon.type';

interface Props {
  pokemon: PokemonType;
}

function PokemonCard({ pokemon }: Props) {
  return (
    <article className={classes.container}>
      <div className={classes.imgBox}>
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        <h3 className={classes.name}>{pokemon.name}</h3>
      </div>
      <div className={classes.infoBox}>
        <div>
          <p>Dimensions:</p>
          <p>
            weight: {pokemon.weight} / height: {pokemon.height}
          </p>
        </div>

        <ul className={classes.statsList}>
          {pokemon.stats.map((stat) => (
            <li key={pokemon.name + stat.stat.name} className={classes.stat}>
              {stat.stat.name}: {stat.base_stat}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export default PokemonCard;
