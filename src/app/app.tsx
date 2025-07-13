import { Component, type ReactNode } from 'react';

import Header from '../features/header';
import PokemonsList from '../features/pokemons-list';
import type { PokemonType } from '../shared/model/pokemon.type';

interface ListState {
  list: PokemonType[];
  isLoading: boolean;
}

type State = Readonly<ListState>;

class App extends Component {
  state: State = {
    list: [],
    isLoading: false,
  };

  setIsLoading = (load: boolean) => {
    this.setState({
      isLoading: load,
    });
  };

  setPokemonsList = (newList: PokemonType[]) => {
    this.setState({
      list: newList,
      isLoading: false,
    });
  };

  render(): ReactNode {
    return (
      <>
        <Header
          setPokemonsList={this.setPokemonsList}
          setIsLoading={this.setIsLoading}
        />

        <main className="container">
          <h2 className="list-pokemon__title">Result</h2>

          <PokemonsList {...this.state} />
        </main>
      </>
    );
  }
}

export default App;
