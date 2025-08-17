import { useEffect, useState } from 'react';

const SEARCH = 'SEARCH';

export const useLineSearch = () => {
  const [searchLine, setSearchLine] = useState<string>('');

  useEffect(() => {
    localStorage.setItem(SEARCH, searchLine);
  }, [searchLine]);

  return { searchLine, setSearchLine };
};
