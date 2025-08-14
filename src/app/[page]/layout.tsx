import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PokedexApp',
  description: 'Pokemon list',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="container">
      <h2 className="list-pokemon__title">Result</h2>

      <div className="flex-row">{children}</div>
    </main>
  );
}
