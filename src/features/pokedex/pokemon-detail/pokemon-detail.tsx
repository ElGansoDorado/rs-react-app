import classes from './pokemon-detail.module.css';
import DetailMenu from './detail-menu';
import { getPokemonDetail } from '@/shared/api/get-pokemon';
import Image from 'next/image';

type Props = {
  detailId: string;
};

async function PokemonDetail({ detailId }: Props) {
  const detail = await getPokemonDetail(detailId);

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
          <Image
            src={detail.sprites.front_default as string}
            alt={detail.name}
            width={180}
            height={180}
          />
        </div>

        <ul>
          {detail.stats.map((item) => (
            <li key={detail.name + item.stat.name}>
              {item.stat.name}: {item.base_stat}
            </li>
          ))}
        </ul>
      </div>

      <DetailMenu {...{ detail }} />
    </section>
  );
}

export default PokemonDetail;
