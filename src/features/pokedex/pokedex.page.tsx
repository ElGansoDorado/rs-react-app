import { PokemonList } from '.';

function Pokedex() {
  return (
    <main className="container">
      <h2 className="list-pokemon__title">Result</h2>

      <div className="flex-row">
        <section>
          {/* <Pagination max={1} /> */}
          <PokemonList pokemons={[]} />
        </section>

        {/* <PokemonDetail /> */}
      </div>
    </main>
  );
}

export default Pokedex;
