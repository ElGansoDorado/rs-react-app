import { Component, type ReactNode } from 'react';
import type { Pokemon } from '../../shared/model/pokemon.type';

interface PokemonsProps {
  list: Pokemon[];
}

type Props = Readonly<PokemonsProps>;

class PokemonsList extends Component<Props> {
  render(): ReactNode {
    return (
      <main className="container">
        <h2>Result</h2>

        {this.props.list ? (
          <ul>
            {this.props.list?.map((item) => (
              <li key={item.name} className="pokemon-item">
                <h3>{item.name}</h3>
                <a href={item.url}>{item.url}</a>
              </li>
            ))}
          </ul>
        ) : (
          <p>Error description</p>
        )}
      </main>
    );
  }
}

export default PokemonsList;
