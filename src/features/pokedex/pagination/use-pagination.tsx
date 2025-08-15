'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export function usePagination(max: number) {
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();

  const [page, setPage] = useState(Number(searchParams.get('path')) || 1);

  const switchPage = (value: number) => {
    if (page + value < 1 || page + value > max) {
      return;
    }

    setPage((prev) => prev + value);
  };

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    params.delete('query');
    params.set('page', `${page}`);

    replace(`${pathname}?${params.toString()}`);
  }, [page]);

  return { page, setPage, switchPage };
}
