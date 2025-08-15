'use client';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export const useDetailToggle = () => {
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();

  const currentDetail = searchParams.get('detail') || '';

  const toggleDetail = (detail: string) => {
    const params = new URLSearchParams(searchParams);

    if (currentDetail !== detail) {
      params.set('detail', detail);
    } else {
      params.delete('detail');
    }

    replace(`${pathname}?${params.toString()}`);
  };

  return { currentDetail, toggleDetail };
};
