import { Component, type ReactNode } from 'react';

import Header from '../features/header';
import PokemonsList from '../features/pokemons-list';
import type { PokemonType } from '../shared/model/pokemon.type';
import { getLineSearch } from '../shared/api/search-save';
import { getPokemons } from '../shared/api/get-pokemon';

interface ListState {
  list: PokemonType[];
  isLoading: boolean;
  crash: boolean;
}

type State = Readonly<ListState>;

class App extends Component {
  state: State = {
    list: [],
    isLoading: false,
    crash: false,
  };

  crash = () => {
    this.setState({
      crash: true,
    });
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

  searchPokemons = async (search: string) => {
    this.setIsLoading(true);
    this.setPokemonsList(await getPokemons(search));
  };

  componentDidMount(): void {
    this.setIsLoading(true);

    getPokemons(getLineSearch()).then((list) => {
      this.setPokemonsList(list);
    });
  }

  render(): ReactNode {
    if (this.state.crash) {
      throw new Error('Oooopss... this button is causing problems!');
    }

    return (
      <>
        <Header searchPokemons={this.searchPokemons} />

        <main className="container">
          <h2 className="list-pokemon__title">Result</h2>
          <button onClick={this.crash} className="button-error">
            don t touch me
          </button>
          <PokemonsList {...this.state} />
        </main>
      </>
    );
  }
}

export default App;
