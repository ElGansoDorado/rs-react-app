import { Component, type ReactNode } from 'react';
import CardPokemons from './card-pokemons';
import type { Pokemon } from '../../shared/model/pokemon.type';

interface PokemonsProps {
  list: Pokemon[];
}

type Props = Readonly<PokemonsProps>;

class PokemonsList extends Component<Props> {
  render(): ReactNode {
    return (
      <main className="container">
        <h2 className="list-pokemon__title">Result</h2>

        {this.props.list.length !== 0 ? (
          <div className="list-pokemon">
            {this.props.list?.map((item) => (
              <CardPokemons key={item.name} url={item.url} />
            ))}
          </div>
        ) : (
          <p>Error description</p>
        )}
      </main>
    );
  }
}

export default PokemonsList;
