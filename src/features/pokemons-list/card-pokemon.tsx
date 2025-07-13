import { Component, type ReactNode } from 'react';
import type { PokemonType } from '../../shared/model/pokemon.type';

interface CardProps {
  pokemon: PokemonType | null;
}

type Props = Readonly<CardProps>;

class CardPokemon extends Component<Props> {
  render(): ReactNode {
    return (
      <article className="pokemon-card">
        <div className="pokemon-card__img-box">
          <img
            src={this.props.pokemon?.sprites.front_default}
            alt={this.props.pokemon?.name}
          />
          <h3 className="pokemon-card__name">{this.props.pokemon?.name}</h3>
        </div>
        <div className="pokemon-card__info-box">
          <div>
            <p>Dimensions:</p>
            <p>
              weight: {this.props.pokemon?.weight} / height:{' '}
              {this.props.pokemon?.height}
            </p>
          </div>

          <ul className="pokemon-card__stats-list">
            {this.props.pokemon?.stats.map((stat) => (
              <li
                key={this.props.pokemon?.name + stat.stat.name}
                className="pokemon-card__stat"
              >
                {stat.stat.name}: {stat.base_stat}
              </li>
            ))}
          </ul>
        </div>
      </article>
    );
  }
}

export default CardPokemon;
