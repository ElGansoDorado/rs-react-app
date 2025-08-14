'use server';

import { cookies } from 'next/headers';
import { Theme } from '../model/theme';

export async function getTheme() {
  const cookieStore = await cookies();
  let theme = cookieStore.get('theme')?.value as Theme;

  if (!theme) {
    theme = 'light';
    cookieStore.set('theme', theme, { path: '/' });
  }

  return theme;
}

export async function toggleTheme() {
  const cookieStore = await cookies();
  const currentTheme = cookieStore.get('theme')?.value || 'light';
  const newTheme: Theme = currentTheme === 'light' ? 'dark' : 'light';
  cookieStore.set('theme', newTheme, { path: '/' });
  return newTheme;
}
