import { Component, type ReactNode } from 'react';

import Header from '../features/header';
import type { pokemon } from '../shared/model/pokemon.type';

interface ListState {
  list: pokemon[];
}

type State = Readonly<ListState>;

class App extends Component {
  state: State = {
    list: [],
  };

  setPokemonsList = (newList: pokemon[]) => {
    this.setState({
      list: newList,
    });
  };

  render(): ReactNode {
    return (
      <>
        <Header setPokemonsList={this.setPokemonsList} />

        <main className="container">
          {this.state.list?.map((item) => (
            <div key={item.name}>
              <p>{item.name}</p> <a href={item.url}>{item.url}</a>
            </div>
          ))}
        </main>
      </>
    );
  }
}

export default App;
