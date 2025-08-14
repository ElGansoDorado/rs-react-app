'use client';
import type { Pokemon } from '@/shared/model/pokemon.type';
import { useRef } from 'react';

export function useCSVDowload() {
  const downloadLinkRef = useRef<HTMLAnchorElement>(null);

  const exportToCSV = (pokemons: Pokemon[]) => {
    if (!pokemons.length) return;

    const headers = ['ID', 'Name'];
    const rows = pokemons.map((p) => [p.id, p.name]);
    const csvContent = [
      headers.join(','),
      ...rows.map((r) => r.join(',')),
    ].join('\n');

    const blob = new Blob(['\uFEFF' + csvContent], {
      type: 'text/csv;charset=utf-8;',
    });
    const url = URL.createObjectURL(blob);

    if (downloadLinkRef.current) {
      downloadLinkRef.current.href = url;
      downloadLinkRef.current.download = `${pokemons.length}_items.csv`;
      downloadLinkRef.current.click();
      URL.revokeObjectURL(url);
    }
  };

  return { downloadLinkRef, exportToCSV };
}
