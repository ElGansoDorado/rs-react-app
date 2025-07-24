import PokemonCard from './pokemon-card/pokemon-card';
import type { PokemonType } from '@/shared/model/pokemon.type';

interface Props {
  pokemonsList: PokemonType[];
  isLoading: boolean;
}

function PokemonsList({ pokemonsList, isLoading }: Props) {
  if (isLoading) {
    return (
      <h2>
        <span className="spinner">߷</span>Loading...
      </h2>
    );
  }

  return (
    <>
      {pokemonsList.length !== 0 ? (
        <div className="list-pokemon">
          {pokemonsList?.map((item) => (
            <PokemonCard key={item.name} pokemon={item} />
          ))}
        </div>
      ) : (
        <p>Unfortunately, the search did not find anything</p>
      )}
    </>
  );
}

export default PokemonsList;
