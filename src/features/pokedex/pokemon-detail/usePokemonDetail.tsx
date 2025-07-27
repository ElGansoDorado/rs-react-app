import { useCallback, useEffect, useState } from 'react';
import { getPokemonDetail } from '@/shared/api/get-pokemon';
import { useSearchParams } from 'react-router-dom';
import type { PokemonType } from '@/shared/model/pokemon.type';

export function usePokemonDetail() {
  const [detail, setDetail] = useState<PokemonType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const detailsQuery = searchParams.get('details') || '';

  const fetchData = useCallback(async () => {
    if (!detailsQuery) {
      setDetail(null);
      return;
    }

    setIsLoading(true);

    try {
      setDetail(await getPokemonDetail(detailsQuery));
    } catch {
      setDetail(null);
    } finally {
      setIsLoading(false);
    }
  }, [detailsQuery]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const closeDetail = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('details');
    setSearchParams(newParams);

    setDetail(null);
  };

  return { detail, isLoading, closeDetail };
}
