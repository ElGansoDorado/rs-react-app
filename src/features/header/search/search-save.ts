const SEARCH = 'SEARCH';

export function setSearch(search: string) {
  localStorage.setItem(SEARCH, search);
}

export function getSearch() {
  return localStorage.getItem(SEARCH) ?? '';
}
