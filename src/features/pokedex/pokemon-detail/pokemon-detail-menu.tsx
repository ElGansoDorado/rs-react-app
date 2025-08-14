'use client';
import classes from './pokemon-detail.module.css';
import Image from 'next/image';

import { Pokemon } from '@/shared/model/pokemon.type';
import { useBag } from '@/shared/hooks/use-bag';

interface Props {
  detail: Pokemon;
}

function PokemonDetailMenu({ detail }: Props) {
  const addInBag = useBag((state) => state.addPokemon);
  const list = useBag((state) => state.list);

  const close = () => {};

  return (
    <div className={classes.menu}>
      <button onClick={close} className={classes.button} role="close">
        <Image
          src={'https://www.svgrepo.com/show/525281/close-circle.svg'}
          alt="close"
          width={24}
          height={24}
          className={classes.icon}
        />
      </button>

      <button
        onClick={() => addInBag(detail)}
        className={classes.button}
        role="add"
      >
        <Image
          src={
            !list.some((pokemon) => pokemon.name === detail.name)
              ? 'https://www.svgrepo.com/show/525643/bag-2.svg'
              : 'https://www.svgrepo.com/show/525648/bag-cross.svg'
          }
          alt="bag img"
          width={24}
          height={24}
          className={classes.icon}
        />
      </button>
    </div>
  );
}

export default PokemonDetailMenu;
