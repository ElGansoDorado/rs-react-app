import type { Metadata } from 'next';
import { Header } from '@/features/header';
import './styles/index.css';

import { getTheme } from '@/shared/providers/theme-provider';
import { Footer } from '@/shared/ui';

export const metadata: Metadata = {
  title: 'Next.js-SSR',
  description: 'My pokedex app',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = await getTheme();
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <div className={`color ${theme}`}>
          <Header />

          {children}

          <Footer />
        </div>
      </body>
    </html>
  );
}
