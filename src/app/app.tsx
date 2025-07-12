import { Component, type ReactNode } from 'react';

import Header from '../features/header';
import PokemonsList from '../features/pokemons-list';
import type { Pokemon } from '../shared/model/pokemon.type';

interface ListState {
  list: Pokemon[];
}

type State = Readonly<ListState>;

class App extends Component {
  state: State = {
    list: [],
  };

  setPokemonsList = (newList: Pokemon[]) => {
    this.setState({
      list: newList,
    });
  };

  render(): ReactNode {
    return (
      <>
        <Header setPokemonsList={this.setPokemonsList} />

        <PokemonsList list={this.state.list} />
      </>
    );
  }
}

export default App;
