import Link from 'next/link';

function ErrorPage() {
  return (
    <main className="abs-center">
      <h3>404 | Error Page</h3>
      <Link href="/" className="button">
        back to project
      </Link>
    </main>
  );
}

export default ErrorPage;
