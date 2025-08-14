'use client';
import { createContext, type ReactNode } from 'react';

export type Theme = 'light' | 'dark';

export type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

export type ThemeProps = {
  children: ReactNode;
  defaultTheme?: Theme;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);
