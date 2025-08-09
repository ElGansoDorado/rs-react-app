import type { Pokemon, PokemonPath } from '@/shared/model/pokemon.type';
import type { QueryObserverPlaceholderResult } from '@tanstack/react-query';

interface responseType {
  data: PokemonPath[] | undefined;
  isLoading: boolean;
  isError: boolean;
}

type responseTypeDetail = {
  data: Pokemon | undefined;
  isLoading: boolean;
  isError: boolean;
};

export type QueryType = responseType & QueryObserverPlaceholderResult;
export type QueryTypeDetai = responseTypeDetail &
  QueryObserverPlaceholderResult;
