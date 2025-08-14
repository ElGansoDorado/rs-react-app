import { getPokemonPage } from '@/shared/api/get-pokemon';
import Pagination from './pagination/pagination';
import PokemonList from './pokemon-list/pokemons-list';
import { Loader } from '@/shared/ui';
import { Suspense } from 'react';

interface Props {
  page: number;
}

async function PokedexList({ page }: Props) {
  const { list, page: max } = await getPokemonPage(page);

  return (
    <Suspense fallback={<Loader />}>
      <section>
        <Pagination {...{ max }} />
        <PokemonList pokemons={list} />
      </section>
    </Suspense>
  );
}

export default PokedexList;
