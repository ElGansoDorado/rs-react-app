import { useCallback, useEffect, useState } from 'react';
import { getPokemon, getPokemonPage } from '@/shared/api/get-pokemon';
import { useSearchParams } from 'react-router-dom';
import type { PokemonPath } from '@/shared/model/pokemon.type';
import { useLineSearch } from '@/shared/hooks/use-line-search';

export function usePokemonList() {
  const [pokemonsList, setPokemonsList] = useState<PokemonPath[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const { setSearchLine } = useLineSearch();

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
      if (pokemonsList.length > 0) {
        setSearchLine(searchQuery);
      }
    }
  }, [pageQuery, searchQuery]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { pokemonsList, isLoading };
}
