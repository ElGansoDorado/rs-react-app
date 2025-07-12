import type { PokemonResponse } from '../model/pokemon.type';

export async function getPokemons(search: string) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon`);

  const pokemonLists: PokemonResponse = await response.json();
  const list =
    search === ''
      ? pokemonLists.results
      : pokemonLists.results.filter((item) => item.name.includes(search));

  return list;
}
