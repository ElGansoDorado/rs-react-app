import type {
  PokemonResponse,
  Pokemon,
  PokemonType,
} from '../model/pokemon.type';
import { setLineSearch } from './search-save';

const PATH = 'https://pokeapi.co/api/v2/pokemon/';

export async function getPokemons(search: string) {
  try {
    const list =
      search === '' ? await getAllPokemonPath() : await getPokemon(search);
    setLineSearch(search);
    return list;
  } catch {
    return [];
  }
}

function checkRespons(response: Response) {
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Resource not found');
    }

    if (response.status === 500) {
      throw new Error('Internal Server Error');
    }

    throw new Error('Error loading data');
  }
}

export async function getPokemon(name: string) {
  const response = await fetch(PATH + name);

  checkRespons(response);

  const Pokemon = [(await response.json()) as Pokemon];
  return Pokemon;
}

export async function getPokemonPage(page: number) {
  const response = await fetch(PATH + `?offset=${20 * (page - 1)}&limit=20`);

  checkRespons(response);

  const pokemonLists: PokemonResponse = await response.json();
  return pokemonLists.results;
}

async function getAllPokemonPath() {
  const response = await fetch(PATH);

  checkRespons(response);

  const pokemonLists: PokemonResponse = await response.json();
  return getPokemonsType(pokemonLists.results);
}

async function getPokemonsType(list: Pokemon[]) {
  const pokemonTypeList = list.map(async (item) => {
    const respons = await fetch(item.url);
    return (await respons.json()) as PokemonType;
  });

  return await Promise.all(pokemonTypeList);
}
