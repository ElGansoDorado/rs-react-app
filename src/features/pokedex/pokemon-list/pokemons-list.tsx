import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { PokemonType } from '@/shared/model/pokemon.type';
import { getPokemon, getPokemonPage } from '@/shared/api/get-pokemon';
import { PokemonCard } from '..';

function PokemonList() {
  const [pokemonsList, setPokemonsList] = useState<PokemonType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();

  const pageQuery = Number(searchParams.get('page')) || 1;
  const searchQuery = searchParams.get('search') || '';

  const fetchData = useCallback(async () => {
    setIsLoading(true);

    try {
      setPokemonsList(
        searchQuery
          ? await getPokemon(searchQuery)
          : await getPokemonPage(pageQuery)
      );
    } catch {
      setPokemonsList([]);
    } finally {
      setIsLoading(false);
    }
  }, [pageQuery, searchQuery]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div>
      {isLoading ? (
        <h3>
          <span className="spinner">߷</span> Loading...
        </h3>
      ) : pokemonsList.length > 0 ? (
        <ul className="list-pokemon">
          {pokemonsList.map((item) => (
            <PokemonCard key={item.name} pokemon={item} />
          ))}
        </ul>
      ) : (
        <p>Unfortunately, the search did not find anything</p>
      )}
    </div>
  );
}

export default PokemonList;
