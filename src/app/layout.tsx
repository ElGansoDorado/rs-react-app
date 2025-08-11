import type { Metadata } from 'next';

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
    <html lang="en">
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
