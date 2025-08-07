import { getPokemonDetail } from '@/shared/api/get-pokemon';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

export function useFetchPokemonDetail() {
  const [searchParams, setSearchParams] = useSearchParams();

  const detailsQuery = searchParams.get('details') || '';

  const queryKey = ['detail', detailsQuery];

  const { data: detail, isLoading } = useQuery({
    queryKey,
    queryFn: async () => await getPokemonDetail(detailsQuery),
  });

  const closeDetail = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('details');
    setSearchParams(newParams);
  };

  return { detail, isLoading, closeDetail };
}
