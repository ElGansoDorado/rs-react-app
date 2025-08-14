'use client';

import Image from 'next/image';
import { useTheme } from '@/shared/hooks/use-theme';

function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme}>
      <Image
        src={
          theme === 'dark'
            ? 'https://www.svgrepo.com/show/529971/sun-2.svg'
            : 'https://www.svgrepo.com/show/529729/moon.svg'
        }
        alt="toggle theme img"
        width={24}
        height={24}
      />
    </button>
  );
}

export default ThemeSwitcher;
