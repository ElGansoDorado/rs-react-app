export type pokemon = {
  name: string;
  url: string;
};

export type pokemonResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: pokemon[];
};
