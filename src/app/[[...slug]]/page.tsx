import { ClientOnly } from './client';
import '../styles/index.css';

export function generateStaticParams() {
  return [{ slug: [''] }];
}

export default function Page() {
  return <ClientOnly />;
}
