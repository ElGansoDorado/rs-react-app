import { Component, type ReactNode } from 'react';
import CardPokemons from './card-pokemon';
import type { PokemonType } from '../../shared/model/pokemon.type';

interface PokemonsProps {
  list: PokemonType[];
  isLoading: boolean;
}

type Props = Readonly<PokemonsProps>;

class PokemonsList extends Component<Props> {
  render(): ReactNode {
    if (this.props.isLoading) {
      return (
        <h2>
          <span className="spinner">߷</span>Loading...
        </h2>
      );
    }

    return (
      <>
        {this.props.list.length !== 0 ? (
          <div className="list-pokemon">
            {this.props.list?.map((item) => (
              <CardPokemons key={item.name} pokemon={item} />
            ))}
          </div>
        ) : (
          <p>Unfortunately, the search did not find anything (</p>
        )}
      </>
    );
  }
}

export default PokemonsList;
