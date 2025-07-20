import type { PokemonType } from '../../model/pokemon.type';

export const mockPokemonResponse = (pokemon: PokemonType) =>
  ({
    ok: true,
    json: () => Promise.resolve(pokemon),
    status: 200,
  }) as Response;

export const mockPokemonArrayResponse = () =>
  ({
    ok: true,
    json: () => Promise.resolve(mockPokemons[0]),
    status: 200,
  }) as Response;

export const mockPokemonEmptyResponse = () =>
  ({
    ok: true,
    json: () => Promise.resolve({ results: [] }),
    status: 200,
  }) as Response;

export const mockPokemonPathResponse = () =>
  ({
    ok: true,
    json: () => Promise.resolve(mockPokemonPath),
  }) as Response;

const mockPokemonPath = {
  results: [
    { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1' },
    { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/2' },
  ],
};

export const mockPokemons: PokemonType[] = [
  {
    id: 1,
    name: 'bulbasaur',
    height: 7,
    weight: 69,
    sprites: {
      back_default:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png',
      front_default:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    },
    stats: [
      {
        base_stat: 45,
        effort: 0,
        stat: {
          name: 'hp',
          url: 'https://pokeapi.co/api/v2/stat/1/',
        },
      },
      {
        base_stat: 49,
        effort: 0,
        stat: {
          name: 'attack',
          url: 'https://pokeapi.co/api/v2/stat/2/',
        },
      },
      {
        base_stat: 49,
        effort: 0,
        stat: {
          name: 'defense',
          url: 'https://pokeapi.co/api/v2/stat/3/',
        },
      },
    ],
  },
  {
    id: 2,
    name: 'charmander',
    height: 6,
    weight: 85,
    sprites: {
      back_default:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png',
      front_default:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    },
    stats: [
      {
        base_stat: 39,
        effort: 0,
        stat: {
          name: 'hp',
          url: 'https://pokeapi.co/api/v2/stat/1/',
        },
      },
      {
        base_stat: 52,
        effort: 0,
        stat: {
          name: 'attack',
          url: 'https://pokeapi.co/api/v2/stat/2/',
        },
      },
    ],
  },
];
