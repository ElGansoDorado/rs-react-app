import type { Metadata } from 'next';
import { Header } from '@/features/header';
import './styles/index.css';

import { getTheme } from '@/shared/providers/theme-provider';

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

          <footer className="footer">
            <p className="footer__text">@2025 Yakovchik Denis</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
