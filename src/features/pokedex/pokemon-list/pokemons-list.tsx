import { useDetailQuery, usePokemonList } from './use-pokemon-list';
import { useBag } from '@/shared/hooks/use-bag';
import { Card, Loader } from '..';

function PokemonList() {
  const { pokemonsList, isLoading } = usePokemonList();
  const { detailsQuery, handlePokemonClick } = useDetailQuery();
  const list = useBag((state) => state.list);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      {pokemonsList.length > 0 ? (
        <ul className="list-pokemon">
          {pokemonsList.map((item) => (
            <Card
              key={item.name}
              name={item.name}
              isActive={detailsQuery === item.name}
              isBag={list.some((pokemon) => pokemon.name === item.name)}
              showDetail={() => handlePokemonClick(item.name)}
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
