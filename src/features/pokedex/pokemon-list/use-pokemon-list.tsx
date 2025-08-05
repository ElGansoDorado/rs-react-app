import { useCallback, useEffect, useState } from 'react';
import { getPokemon, getPokemonPage } from '@/shared/api/get-pokemon';
import { useNavigate, useSearchParams } from 'react-router-dom';
import type { PokemonPath } from '@/shared/model/pokemon.type';
import { useLineSearch } from '@/shared/hooks/use-line-search';

export const usePokemonList = () => {
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
};

export const useDetailQuery = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const detailsQuery = searchParams.get('details') || '';

  const handlePokemonClick = (id: string) => {
    const newParams = new URLSearchParams(searchParams);

    if (detailsQuery === id) {
      newParams.delete('details');
      setSearchParams(newParams);
      return;
    }

    newParams.set('details', id);
    navigate(`?${newParams.toString()}`);
  };

  return { detailsQuery, handlePokemonClick };
};
