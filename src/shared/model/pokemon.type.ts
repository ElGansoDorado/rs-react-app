export type Pokemon = {
  name: string;
  url: string;
};

export type PokemonResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
};

export type PokemonSprites = {
  back_default?: string;
  front_default?: string;
};

interface Stat {
  name: string;
  url: string;
}

interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: Stat;
}

export type PokemonType = {
  id: number;
  name: string;
  weight: number;
  height: number;
  stats: PokemonStat[];
  sprites: PokemonSprites;
};
