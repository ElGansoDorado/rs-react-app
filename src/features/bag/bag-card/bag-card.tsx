import classes from './bag-card.module.css';
import type { PokemonType } from '@/shared/model/pokemon.type';

type Props = {
  pokemon: PokemonType;
  close: (name: string) => void;
};

function BagCard({ pokemon, close }: Props) {
  return (
    <article className={classes.container}>
      <button className={classes.close} onClick={() => close(pokemon.name)}>
        <img
          src="https://www.svgrepo.com/show/525281/close-circle.svg"
          alt="close card img"
        />
      </button>

      <img
        className={classes.img}
        src={pokemon.sprites.front_default}
        alt={'front img ' + pokemon.name}
      />
      <h3 className={classes.name}>{pokemon.name}</h3>
    </article>
  );
}

export default BagCard;
