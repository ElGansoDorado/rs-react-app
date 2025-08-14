'use client';
import type { PokemonPath } from '@/shared/model/pokemon.type';
import { useBag } from '@/shared/hooks/use-bag';
import { PokemonCard } from '..';
import { useDetailQuery } from './use-detail-query';

type Props = {
  pokemons: PokemonPath[];
};

function PokemonList({ pokemons }: Props) {
  const { currentDetail, toggleDetail } = useDetailQuery();
  const list = useBag((state) => state.list);

  return (
    <div>
      {pokemons.length > 0 ? (
        <ul className="list-pokemon">
          {pokemons.map((item) => (
            <PokemonCard
              key={item.name}
              name={item.name}
              isActive={currentDetail === item.name}
              isBag={list.some((pokemon) => pokemon.name === item.name)}
              showDetail={() => toggleDetail(item.name)}
            />
          ))}
        </ul>
      ) : (
        <p>Unfortunately, the search did not find anything</p>
      )}
    </div>
  );
}

export default PokemonList;
