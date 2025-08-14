import type { Metadata } from 'next';
import Header from '@/features/header';
import './styles/index.css';

export const metadata: Metadata = {
  title: 'Next.js-SSR',
  description: 'My pokedex app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <div className={`color light`}>
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
