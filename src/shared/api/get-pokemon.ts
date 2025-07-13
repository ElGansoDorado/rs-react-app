import type {
  PokemonResponse,
  Pokemon,
  PokemonType,
} from '../model/pokemon.type';

const PATH = `https://pokeapi.co/api/v2/pokemon/`;

export async function getPokemons(search: string) {
  const response = await fetch(PATH);

  const pokemonLists: PokemonResponse = await response.json();
  const list =
    search === ''
      ? pokemonLists.results
      : pokemonLists.results.filter((item) => item.name.includes(search));

  return await getPokemonsType(list);
}

async function getPokemonsType(list: Pokemon[]) {
  const pokemonTypeList = list.map(async (item) => {
    const respons = await fetch(item.url);
    return (await respons.json()) as PokemonType;
  });

  return await Promise.all(pokemonTypeList);
}
