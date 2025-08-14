import Image from 'next/image';
import classes from './card.module.css';

interface Props {
  name: string;
  isActive: boolean;
  isBag: boolean;
  showDetail: () => void;
}

function Card({ name, isActive, isBag, showDetail }: Props) {
  return (
    <li className={classes.container}>
      {isBag && (
        <Image
          src={'https://www.svgrepo.com/show/525643/bag-2.svg'}
          alt="bag icon"
          width={24}
          height={24}
          className={classes.icon}
        />
      )}
      <div
        data-testid="pokemon-card"
        onClick={showDetail}
        className={`${classes.card} ${isActive ? classes.active : ''}`}
      >
        <p>current</p>
        <h3>{name}</h3>
      </div>
    </li>
  );
}

export default Card;
