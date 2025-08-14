import { PokedexList } from '@/features/pokedex';
import { Loader } from '@/shared/ui';
import { Suspense } from 'react';

interface Props {
  params: { page: number };
}

export default function Page({ params }: Props) {
  return (
    <Suspense fallback={<Loader />}>
      <PokedexList {...{ params }} />
    </Suspense>
  );
}
