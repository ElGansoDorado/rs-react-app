import { getPokemonPage } from '@/shared/api/get-pokemon';
import Pagination from './pagination/pagination';
import PokemonList from './pokemon-list/pokemons-list';

interface Props {
  params: { page: number };
}

export default async function PokedexList({ params }: Props) {
  const { list, page } = await getPokemonPage(params.page);

  return (
    <section>
      <Pagination max={page} />
      <PokemonList pokemons={list} />
    </section>
  );
}
