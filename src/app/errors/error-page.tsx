import {
  useNavigate,
  useRouteError,
  isRouteErrorResponse,
} from 'react-router-dom';

type TypeErrorPage = {
  status: number;
  data: string;
};

function ErrorPage() {
  const error = useRouteError() as TypeErrorPage;
  const navigate = useNavigate();

  if (isRouteErrorResponse(error)) {
    return (
      <main className="abs-center">
        <h3>Error Page</h3>
        <p>
          {error.status} | {error.data}
        </p>
        <button onClick={() => navigate('/')} className="button">
          back to project
        </button>
      </main>
    );
  }

  throw new Error(error.data);
}

export default ErrorPage;
