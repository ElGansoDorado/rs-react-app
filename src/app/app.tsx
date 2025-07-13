import { Component, type ReactNode } from 'react';

import Header from '../features/header';
import PokemonsList from '../features/pokemons-list';
import type { PokemonType } from '../shared/model/pokemon.type';
import {
  checkLineSearchSave,
  getLineSearch,
  setLineSearch,
} from '../shared/api/search-save';
import { getPokemons } from '../shared/api/get-pokemon';

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

  searchPokemons = async (search: string) => {
    if (!checkLineSearchSave(search)) {
      this.setIsLoading(true);
      this.setPokemonsList(await getPokemons(search));
      setLineSearch(search);
    }
  };

  componentDidMount(): void {
    this.setIsLoading(true);

    getPokemons(getLineSearch()).then((list) => {
      this.setPokemonsList(list);
    });
  }

  render(): ReactNode {
    return (
      <>
        <Header searchPokemons={this.searchPokemons} />

        <main className="container">
          <h2 className="list-pokemon__title">Result</h2>

          <PokemonsList {...this.state} />
        </main>
      </>
    );
  }
}

export default App;
