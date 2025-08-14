import { getPokemonPage } from '@/shared/api/get-pokemon';
import Pagination from './pagination/pagination';
import PokemonList from './pokemon-list/pokemons-list';
import { SuspenseLoader } from '@/shared/ui';

type Props = {
  page: number;
};

async function PokedexList({ page }: Props) {
  const { list, page: max } = await getPokemonPage(page);

  return (
    <SuspenseLoader>
      <section>
        <Pagination {...{ max }} />
        <PokemonList pokemons={list} />
      </section>
    </SuspenseLoader>
  );
}

export default PokedexList;
