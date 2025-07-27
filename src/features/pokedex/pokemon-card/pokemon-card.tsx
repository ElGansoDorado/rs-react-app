import classes from './pokemon-card.module.css';

interface Props {
  name: string;
  active: boolean;
  showDetail: () => void;
}

function PokemonCard({ name, active, showDetail }: Props) {
  return (
    <li
      onClick={showDetail}
      className={`${classes.container} ${active ? classes.active : ''}`}
    >
      <p>current</p>
      <h3>{name}</h3>
    </li>
  );
}

export default PokemonCard;
