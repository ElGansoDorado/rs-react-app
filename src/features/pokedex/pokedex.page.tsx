import { PokemonList, PokemonDetail, Pagination } from '.';

export function Pokedex() {
  return (
    <main className="container">
      <h2 className="list-pokemon__title">Result</h2>

      <div className="flex-row">
        <section>
          <Pagination />

          <PokemonList />
        </section>

        <PokemonDetail />
      </div>
    </main>
  );
}

export const Component = Pokedex;
