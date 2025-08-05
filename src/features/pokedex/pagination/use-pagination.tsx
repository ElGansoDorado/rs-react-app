import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPokemonNumberPage } from '@/shared/api/get-pokemon';

export function usePagination() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);
  const [maxPage, setMaxPage] = useState(0);

  const switchPage = (value: number) => {
    if (page + value < 1 || page + value > maxPage) {
      return;
    }

    setPage((prev) => prev + value);
  };

  useEffect(() => {
    const fetchMaxPage = async () => {
      try {
        setMaxPage(await getPokemonNumberPage());
      } catch (error) {
        console.error('Failed to fetch max page:', error);
        setMaxPage(66);
      }
    };

    fetchMaxPage();
  }, []);

  useEffect(() => {
    if (!searchParams.has('page')) return;

    const params = Object.fromEntries(searchParams);
    setSearchParams({ ...params, page: `${page}` });
  }, [page]);

  return { page, maxPage, setPage, switchPage };
}
