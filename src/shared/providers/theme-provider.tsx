import {
  ThemeContext,
  type Theme,
  type ThemeProps,
} from '@/shared/model/theme';
import { useEffect, useMemo, useState } from 'react';

const THEME_KEY = 'THEME_KEY';

export const ThemeProvider = ({
  children,
  defaultTheme = 'light',
}: ThemeProps) => {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  useEffect(() => {
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  useEffect(() => {
    const savedTheme = localStorage.getItem(THEME_KEY) as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const contextValue = useMemo(
    () => ({
      theme,
      toggleTheme,
    }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};
