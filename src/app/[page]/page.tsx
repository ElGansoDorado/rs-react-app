import { PokedexList } from '@/features/pokedex';

interface Props {
  params: { page: number };
}

async function Page({ params }: Props) {
  const { page } = await params;
  return <PokedexList {...{ page }} />;
}

export default Page;
