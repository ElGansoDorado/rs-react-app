import { useEffect, useState } from 'react';

const SEARCH = 'SEARCH';

export function useLineSearch() {
  const [searchLine, setSearchLine] = useState<string>(() => {
    return localStorage.getItem(SEARCH) || '';
  });

  useEffect(() => {
    localStorage.setItem(SEARCH, searchLine);
  }, [searchLine]);

  return { searchLine, setSearchLine };
}
