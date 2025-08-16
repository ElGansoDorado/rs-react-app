'use client';
import type { Pokemon } from '@/shared/model/pokemon.type';
import { useRef } from 'react';

export function useCSVDowload() {
  const downloadLinkRef = useRef<HTMLAnchorElement>(null);

  const handleDownload = async (pokemons: Pokemon[]) => {
    const response = await fetch('/api/export-csv', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pokemons),
    });

    if (!response.ok) {
      console.error('Export failed');
      return;
    }

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);

    if (downloadLinkRef.current) {
      downloadLinkRef.current.href = url;
      downloadLinkRef.current.download = `${pokemons.length}_items.csv`;
      downloadLinkRef.current.click();
      URL.revokeObjectURL(url);
    }
  };

  return { downloadLinkRef, handleDownload };
}
