import { useSearchParams, useNavigate } from 'react-router-dom';
import { usePokemonList } from './usePokemonList';
import { Card, Loader } from '..';

function PokemonList() {
  const { pokemonsList, isLoading } = usePokemonList();

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const detailsQuery = searchParams.get('details') || '';

  const handlePokemonClick = (id: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('details', id);
    navigate(`?${newParams.toString()}`);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      {pokemonsList.length > 0 ? (
        <ul className="list-pokemon">
          {pokemonsList.map((item) => (
            <Card
              key={item.name}
              name={item.name}
              active={detailsQuery === item.name}
              showDetail={() => handlePokemonClick(item.name)}
            />
          ))}
        </ul>
      ) : (
        <p>Unfortunately, the search did not find anything</p>
      )}
    </div>
  );
}

export default PokemonList;
