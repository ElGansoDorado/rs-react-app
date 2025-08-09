import { PokemonList, PokemonDetail, Pagination, Loader } from '.';
import { useSearchParams } from 'react-router-dom';
import { useFetchPokemonList } from './queries';

export function Pokedex() {
  const { data, isLoading, isError } = useFetchPokemonList();
  const [searchParams] = useSearchParams();

  return (
    <main className="container">
      <h2 className="list-pokemon__title">Result</h2>

      <div className="flex-row">
        {isError ? (
          <p>Oooopsss... There was an error in your request.</p>
        ) : (
          <section>
            {searchParams.has('page') && <Pagination max={data.page} />}

            {isLoading ? <Loader /> : <PokemonList pokemons={data.list} />}
          </section>
        )}

        {searchParams.has('details') && <PokemonDetail />}
      </div>
    </main>
  );
}

export const Component = Pokedex;
