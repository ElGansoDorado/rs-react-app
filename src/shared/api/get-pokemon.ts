import type { PokemonResponse } from '../model/pokemon.type';

export async function getPokemons(name: string) {
  const search = name.trim();

  const response = await fetch(`https://pokeapi.co/api/v2/pokemon`);

  const pokemonLists: PokemonResponse = await response.json();
  const list =
    name === ''
      ? pokemonLists.results
      : pokemonLists.results.filter((item) => item.name.includes(search));

  return list;
}
