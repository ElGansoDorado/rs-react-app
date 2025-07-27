import type {
  PokemonResponse,
  Pokemon,
  PokemonType,
} from '../model/pokemon.type';

const PATH = 'https://pokeapi.co/api/v2/pokemon/';

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

export async function getPokemonDetail(id: string) {
  const response = await fetch(PATH + id);

  checkRespons(response);

  const pokemonDetail: PokemonType = await response.json();
  return pokemonDetail;
}
