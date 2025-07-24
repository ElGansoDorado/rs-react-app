import { useEffect, useState } from 'react';
import PokemonCard from './pokemon-card/pokemon-card';
import type { PokemonType } from '@/shared/model/pokemon.type';
import { getPokemons } from '@/shared/api/get-pokemon';
import { useSearchParams } from 'react-router-dom';
import { getLineSearch } from '@/shared/api/search-save';

export function PokemonsList() {
  const [pokemonsList, setPokemonsList] = useState<PokemonType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.has('search')
    ? searchParams.get('search') || ''
    : getLineSearch();

  useEffect(() => {
    setIsLoading(true);
    getPokemons(searchQuery)
      .then((data) => setPokemonsList(data))
      .finally(() => setIsLoading(false));
  }, [searchQuery]);

  return (
    <main className="container">
      <h2 className="list-pokemon__title">Result</h2>

      {isLoading ? (
        <h3>
          <span className="spinner">߷</span> Loading...
        </h3>
      ) : pokemonsList.length > 0 ? (
        <div className="list-pokemon">
          {pokemonsList.map((item) => (
            <PokemonCard key={item.name} pokemon={item} />
          ))}
        </div>
      ) : (
        <p>Unfortunately, the search did not find anything</p>
      )}
    </main>
  );
}

export const Component = PokemonsList;
