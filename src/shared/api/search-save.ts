const SEARCH = 'SEARCH';

export const setLineSearch = (search: string) =>
  localStorage.setItem(SEARCH, search);

export const checkLineSearchSave = (search: string) =>
  localStorage.getItem(SEARCH) === search;

export const getLineSearch = () => localStorage.getItem(SEARCH) ?? '';
