import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { getPokemon, getPokemonPage } from '@/shared/api/get-pokemon';

export const useFetchPokemonList = () => {
  const [searchParams] = useSearchParams();

  const pageQuery = Number(searchParams.get('page')) || 1;
  const searchQuery = searchParams.get('search') || '';

  const queryKey = ['pokemons', pageQuery, searchQuery];

  const {
    data: pokemonsList = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey,
    queryFn: async () => {
      return searchQuery
        ? await getPokemon(searchQuery)
        : await getPokemonPage(pageQuery);
    },
  });

  return { pokemonsList, isLoading, isError };
};
