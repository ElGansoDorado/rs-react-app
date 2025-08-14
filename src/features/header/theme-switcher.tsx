'use client';

import Image from 'next/image';
import { toggleTheme, getTheme } from '@/shared/providers/theme-provider';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

function ThemeSwitcher() {
  const [theme, setTheme] = useState('light');
  const router = useRouter();

  const handleToggle = async () => {
    setTheme(await toggleTheme());
    router.refresh();
  };

  useEffect(() => {
    getTheme().then((theme) => setTheme(theme));
  }, []);

  return (
    <button onClick={handleToggle}>
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
