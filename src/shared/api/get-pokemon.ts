import type {
  PokemonResultsRespons,
  PokemonResponse,
  PokemonPath,
  Pokemon,
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

export async function getPokemon(name: string): Promise<PokemonResultsRespons> {
  const response = await fetch(PATH + name, {
    next: { revalidate: 1 * 60, tags: [`pokemon-${name}`] },
  });

  checkRespons(response);

  const Pokemon = [(await response.json()) as PokemonPath];
  return { list: Pokemon, numberPage: 0 };
}

export async function getPokemonPage(
  page: number
): Promise<PokemonResultsRespons> {
  const response = await fetch(PATH + `?offset=${20 * (page - 1)}&limit=20`, {
    next: {
      revalidate: 1 * 60,
      tags: [`pokemon-page-${page}`],
    },
  });

  checkRespons(response);

  const pokemonResponse: PokemonResponse = await response.json();
  return {
    list: pokemonResponse.results,
    numberPage: Math.ceil(pokemonResponse.count / 20),
  };
}

export async function getPokemonDetail(id: string): Promise<Pokemon> {
  const response = await fetch(PATH + id);

  checkRespons(response);

  const pokemonDetail: Pokemon = await response.json();
  return pokemonDetail;
}
