'use client';
import classes from './search.module.css';
import { useState } from 'react';
import { useLineSearch } from '@/shared/hooks/use-line-search';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

function Search() {
  const { searchLine } = useLineSearch();
  const [search, setSearch] = useState(searchLine);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const t = useTranslations('Header');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const params = new URLSearchParams(searchParams);
    const trimmedSearch = search.trim();

    if (trimmedSearch) {
      params.delete('page');
      params.set('query', trimmedSearch);
      setSearch(trimmedSearch);
    } else {
      params.delete('query');
      params.set('page', '1');
    }

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className={classes.container} role="search">
      <input
        type="search"
        name="search"
        className={classes.search}
        placeholder={`${t('search')}...`}
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />

      <input
        type="submit"
        name="search-button"
        value={t('search')}
        className={classes.button}
      />
    </form>
  );
}

export default Search;
