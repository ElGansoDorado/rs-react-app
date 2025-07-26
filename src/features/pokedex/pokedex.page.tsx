import { PokemonList, Pagination } from '.';

export function Pokedex() {
  return (
    <main className="container">
      <h2 className="list-pokemon__title">Result</h2>

      <section>
        <Pagination />

        <PokemonList />
      </section>

      <section></section>
    </main>
  );
}

export const Component = Pokedex;
