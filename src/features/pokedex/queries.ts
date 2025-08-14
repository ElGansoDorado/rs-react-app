// import { useQuery } from '@tanstack/react-query';
// import { useSearchParams } from 'react-router-dom';
// import { getPokemon, getPokemonPage } from '@/shared/api/get-pokemon';
// import type { PokemonResultsRespons } from '@/shared/model/pokemon.type';

// export const useFetchPokemonList = () => {
//   const [searchParams] = useSearchParams();

//   const pageQuery = Number(searchParams.get('page')) || 1;
//   const searchQuery = searchParams.get('search') || '';

//   const queryKey = ['pokemons', pageQuery, searchQuery];

//   const { data, isLoading, isError } = useQuery({
//     queryKey,
//     queryFn: async () => {
//       return searchQuery
//         ? await getPokemon(searchQuery)
//         : await getPokemonPage(pageQuery);
//     },
//   });

//   return {
//     data: data || ({ list: [], page: 1 } as PokemonResultsRespons),
//     isLoading,
//     isError,
//   };
// };
