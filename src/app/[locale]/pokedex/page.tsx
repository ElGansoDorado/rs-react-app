import { Pagination, PokemonDetail, PokemonList } from '@/features/pokedex';
import { getPokemon, getPokemonPage } from '@/shared/api/get-pokemon';
import { SuspenseLoader, RefreshButton } from '@/shared/ui';

type Props = {
  searchParams?: Promise<{
    query?: string;
    page?: string;
    detail?: string;
  }>;
};

async function PokedexPage(props: Props) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const detail = searchParams?.detail || '';

  const { list, numberPage } = query
    ? await getPokemon(query)
    : await getPokemonPage(currentPage);

  return (
    <main className="container">
      <div>
        <h2 className="list-pokemon__title">Result</h2>
        <RefreshButton
          tag={query ? `pokemon-${query}` : `pokemon-page-${currentPage}`}
        />
      </div>

      <div className="flex-row">
        <SuspenseLoader>
          <section>
            {!query && <Pagination {...{ numberPage }} />}
            <PokemonList pokemons={list} />
          </section>
        </SuspenseLoader>
        {detail !== '' && (
          <SuspenseLoader>
            <PokemonDetail id={detail} />
          </SuspenseLoader>
        )}
      </div>
    </main>
  );
}

export default PokedexPage;
