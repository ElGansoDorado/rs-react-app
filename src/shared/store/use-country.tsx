import { create } from 'zustand';

interface CountryState {
  countries: string[];
}

export const useCountry = create<CountryState>(() => ({
  countries: [
    'United States',
    'United Kingdom',
    'Canada',
    'Australia',
    'Germany',
    'France',
    'Italy',
    'Spain',
    'Japan',
    'China',
    'India',
    'Brazil',
    'Russia',
    'Mexico',
    'South Korea',
    'Netherlands',
    'Sweden',
    'Switzerland',
    'Norway',
    'Singapore',
  ],
}));
