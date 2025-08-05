import { PokemonList, PokemonDetail, Pagination } from '.';
import { useSearchParams } from 'react-router-dom';

function Pokedex() {
  const [searchParams] = useSearchParams();

  return (
    <main className="container">
      <h2 className="list-pokemon__title">Result</h2>

      <div className="flex-row">
        <section>
          {searchParams.has('page') && <Pagination />}

          <PokemonList />
        </section>

        {searchParams.has('details') && <PokemonDetail />}
      </div>
    </main>
  );
}

export const Component = Pokedex;
