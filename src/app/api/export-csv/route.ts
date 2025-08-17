import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import type { Pokemon } from '@/shared/model/pokemon.type';

export async function POST(request: NextRequest) {
  const pokemons: Pokemon[] = await request.json();

  if (!pokemons.length) {
    return NextResponse.json({ error: 'No data to export' }, { status: 400 });
  }

  const headers = ['ID', 'Name'];
  const rows = pokemons.map((p) => [p.id, p.name]);
  const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join(
    '\n'
  );

  const contentWithBOM = '\uFEFF' + csvContent;

  return new NextResponse(contentWithBOM, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${pokemons.length}_items.csv"`,
    },
  });
}
