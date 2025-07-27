import { useCallback, useEffect, useState } from 'react';
import { getPokemon, getPokemonPage } from '@/shared/api/get-pokemon';
import { useSearchParams } from 'react-router-dom';
import type { Pokemon } from '@/shared/model/pokemon.type';

export function usePokemonList() {
  const [pokemonsList, setPokemonsList] = useState<Pokemon[]>([]);
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

  return { pokemonsList, isLoading };
}
