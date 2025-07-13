import type {
  PokemonResponse,
  Pokemon,
  PokemonType,
} from '../model/pokemon.type';

const PATH = `https://pokeapi.co/api/v2/pokemon/`;
let cash_pokemons: PokemonType[] = [];

export async function getPokemons(search: string) {
  if (cash_pokemons.length === 0) {
    cash_pokemons = await getPokemonPath();
  }

  return cash_pokemons.filter((item) => item.name.includes(search));
}

async function getPokemonPath() {
  const response = await fetch(PATH);
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
