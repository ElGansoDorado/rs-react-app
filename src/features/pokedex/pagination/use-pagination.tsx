'use client';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export function usePagination(max: number) {
  const pathname = usePathname();
  // const router = useRouter();

  const pathSegments = pathname.split('/');
  const [page, setPage] = useState(Number(pathSegments[2]));

  // const currentDetail = pathSegments.length > 2 ? pathSegments[3] : null;

  const switchPage = (value: number) => {
    if (page + value < 1 || page + value > max) {
      return;
    }

    setPage((prev) => prev + value);
  };

  useEffect(() => {
    // const basePath = `http://localhost:3000/${pathSegments[1]}/${page}`;
    // if (currentDetail) {
    //   router.push(basePath + `/${currentDetail}`);
    // } else {
    //   router.push(`${basePath}`);
    // }
  }, [page]);

  return { page, setPage, switchPage };
}
