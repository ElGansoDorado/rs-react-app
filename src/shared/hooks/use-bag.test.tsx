import { act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useBag } from './use-bag';
import { mockPokemons } from '../test-utils/mocks/pokemons';

describe('useBag store', () => {
  const mockPokemon = mockPokemons[0];

  beforeEach(() => {
    const { getState } = useBag;
    getState().clear();
    vi.clearAllMocks();
  });

  it('should initialize with empty list', () => {
    const { getState } = useBag;
    expect(getState().list).toEqual([]);
  });

  it('should add pokemon to bag', () => {
    const { getState } = useBag;

    act(() => {
      getState().addPokemon(mockPokemon);
    });

    expect(getState().list).toEqual([mockPokemon]);
    expect(getState().hasPokemon('bulbasaur')).toBe(true);
  });

  it('should remove pokemon from bag', () => {
    const { getState } = useBag;

    act(() => {
      getState().addPokemon(mockPokemon);
      getState().removePokemon('bulbasaur');
    });

    expect(getState().list).toEqual([]);
    expect(getState().hasPokemon('bulbasaur')).toBe(false);
  });

  it('should clear the bag', () => {
    const { getState } = useBag;

    act(() => {
      getState().addPokemon(mockPokemon);
      getState().clear();
    });

    expect(getState().list).toEqual([]);
  });

  it('should check if pokemon exists in bag', () => {
    const { getState } = useBag;

    act(() => {
      getState().addPokemon(mockPokemon);
    });

    expect(getState().hasPokemon('pikachu')).toBe(false);
    expect(getState().hasPokemon('bulbasaur')).toBe(true);
  });
});
