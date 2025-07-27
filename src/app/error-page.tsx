import { useNavigate } from 'react-router-dom';

function ErrorPage() {
  const navigate = useNavigate();
  return (
    <main className="container">
      <h3>Error Page</h3>
      <button onClick={() => navigate('/')} className="button">
        back to project
      </button>
    </main>
  );
}

export default ErrorPage;
