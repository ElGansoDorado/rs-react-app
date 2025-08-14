import { PokedexList, PokemonDetail } from '@/features/pokedex';
import { SuspenseLoader } from '@/shared/ui';

interface Props {
  params: { page: number; detail: string };
}

async function Page({ params }: Props) {
  const { page, detail } = await params;
  return (
    <>
      <PokedexList {...{ page }} />
      <SuspenseLoader>
        <PokemonDetail detailId={detail} />
      </SuspenseLoader>
    </>
  );
}

export default Page;
