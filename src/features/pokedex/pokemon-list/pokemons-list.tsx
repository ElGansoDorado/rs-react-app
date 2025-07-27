import { useSearchParams, useNavigate } from 'react-router-dom';
import { usePokemonList } from './usePokemonList';
import { PokemonCard } from '..';

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

  return (
    <div>
      {isLoading ? (
        <h3>
          <span className="spinner">߷</span> Loading...
        </h3>
      ) : pokemonsList.length > 0 ? (
        <ul className="list-pokemon">
          {pokemonsList.map((item) => (
            <PokemonCard
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
