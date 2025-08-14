import Image from 'next/image';
import classes from './bag-card.module.css';
import type { Pokemon } from '@/shared/model/pokemon.type';

type Props = {
  pokemon: Pokemon;
  close: (name: string) => void;
};

function BagCard({ pokemon, close }: Props) {
  return (
    <article className={classes.container}>
      <button className={classes.close} onClick={() => close(pokemon.name)}>
        <Image
          src={'https://www.svgrepo.com/show/525281/close-circle.svg'}
          alt="close card img"
          width={25}
          height={25}
        />
      </button>

      <Image
        src={pokemon.sprites.front_default as string}
        alt={'front img ' + pokemon.name}
        width={200}
        height={200}
        className={classes.img}
      />
      <h3 className={classes.name}>{pokemon.name}</h3>
    </article>
  );
}

export default BagCard;
