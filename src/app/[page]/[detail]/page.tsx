import { PokedexList, PokemonDetail } from '@/features/pokedex';
import { Loader } from '@/shared/ui';
import { Suspense } from 'react';

interface Props {
  params: { page: number; detail: string };
}

export default function Page({ params }: Props) {
  return (
    <Suspense fallback={<Loader />}>
      <PokedexList {...{ params }} />
      <PokemonDetail detailId={params.detail} />
    </Suspense>
  );
}
