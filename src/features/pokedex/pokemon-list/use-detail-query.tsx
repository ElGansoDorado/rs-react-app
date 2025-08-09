import { useNavigate, useSearchParams } from 'react-router-dom';

export const useDetailQuery = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const detailsQuery = searchParams.get('details') || '';

  const handlePokemonClick = (id: string) => {
    const newParams = new URLSearchParams(searchParams);

    if (detailsQuery === id) {
      newParams.delete('details');
      setSearchParams(newParams);
      return;
    }

    newParams.set('details', id);
    navigate(`?${newParams.toString()}`);
  };

  return { detailsQuery, handlePokemonClick };
};
