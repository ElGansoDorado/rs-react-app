import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { routing } from '@/i18n/routing';

import { getTheme } from '@/shared/providers/theme-provider';
import { ExportControls, Footer, Modal } from '@/shared/ui';
import { Header } from '@/features/header';

import '../styles/index.css';

export const metadata: Metadata = {
  title: 'Next.js-SSR',
  description: 'My pokedex app',
};

async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const theme = await getTheme();
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale} data-scroll-behavior="smooth">
      <body>
        <div className={`color ${theme}`}>
          <NextIntlClientProvider>
            <Header />

            {children}

            <Modal>
              <ExportControls />
            </Modal>

            <Footer />
          </NextIntlClientProvider>
        </div>
      </body>
    </html>
  );
}

export default RootLayout;
