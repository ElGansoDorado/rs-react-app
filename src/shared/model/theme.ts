import { createContext } from 'react';

export type Theme = 'light' | 'dark';

export type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

export type ThemeProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);
