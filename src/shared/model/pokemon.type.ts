export type PokemonPath = {
  name: string;
  url: string;
};

export type PokemonResponse = {
  count: number;
  results: PokemonPath[];
};

export type PokemonResultsRespons = {
  list: PokemonPath[];
  numberPage: number;
};

export type PokemonSprites = {
  back_default?: string;
  front_default?: string;
};

interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: PokemonPath;
}

interface PokemonType {
  slot: number;
  type: PokemonPath;
}

export type Pokemon = {
  id: number;
  name: string;
  weight: number;
  height: number;
  sprites: PokemonSprites;
  stats: PokemonStat[];
  types: PokemonType[];
};
