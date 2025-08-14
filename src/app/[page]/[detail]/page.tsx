import { PokedexList, PokemonDetail } from '@/features/pokedex';
import { Loader } from '@/shared/ui';
import { Suspense } from 'react';

interface Props {
  params: { page: number; detail: string };
}

async function Page({ params }: Props) {
  const { page, detail } = await params;
  return (
    <>
      <PokedexList {...{ page }} />
      <Suspense fallback={<Loader />}>
        <PokemonDetail detailId={detail} />
      </Suspense>
    </>
  );
}

export default Page;
