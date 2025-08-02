export type PokemonPath = {
  name: string;
  url: string;
};

export type PokemonResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonPath[];
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
