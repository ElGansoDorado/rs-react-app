// import { useEffect, useState } from 'react';

// export function usePagination(max: number) {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const [page, setPage] = useState(Number(searchParams.get('page')) || 1);

//   const switchPage = (value: number) => {
//     if (page + value < 1 || page + value > max) {
//       return;
//     }

//     setPage((prev) => prev + value);
//   };

//   useEffect(() => {
//     if (!searchParams.has('page')) return;

//     const params = Object.fromEntries(searchParams);
//     setSearchParams({ ...params, page: `${page}` });
//   }, [page]);

//   return { page, max, setPage, switchPage };
// }
