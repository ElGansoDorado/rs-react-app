import Header from '../features/header';
import PokemonsList from '../features/pokemons-list';
import type { PokemonType } from '../shared/model/pokemon.type';
import { getLineSearch } from '../shared/api/search-save';
import { getPokemons } from '../shared/api/get-pokemon';
import { useState, useEffect } from 'react';

function App() {
  const [pokemonsList, setPokemonsList] = useState<PokemonType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadPokemons = (search: string) => {
    setIsLoading(true);
    getPokemons(search)
      .then((data) => setPokemonsList(data))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    loadPokemons(getLineSearch());
  }, []);

  return (
    <>
      <Header searchPokemons={loadPokemons} />

      <main className="container">
        <h2 className="list-pokemon__title">Result</h2>
        <PokemonsList {...{ pokemonsList, isLoading }} />
      </main>
    </>
  );
}

export default App;
