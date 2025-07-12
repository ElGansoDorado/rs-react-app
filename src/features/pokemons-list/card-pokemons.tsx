import { Component, type ReactNode } from 'react';
import type { PokemonType } from '../../shared/model/pokemon.type';

interface CardProps {
  url: string;
}

interface CardState {
  pokemon: PokemonType | null;
}

type Props = Readonly<CardProps>;
type State = Readonly<CardState>;

class CardPokemons extends Component<Props> {
  state: State = {
    pokemon: null,
  };

  componentDidMount(): void {
    this.getPokemonInfo(this.props.url).then((item) => {
      this.setState({
        pokemon: item,
      });
    });
  }

  getPokemonInfo = async (url: string) => {
    const respons = await fetch(url);
    const pokemonInfo: PokemonType = await respons.json();
    return pokemonInfo;
  };

  render(): ReactNode {
    return (
      <article className="pokemon-card">
        <div className="pokemon-card__img-box">
          <img
            src={this.state.pokemon?.sprites.front_default}
            alt={this.state.pokemon?.name}
          />
          <h3 className="pokemon-card__name">{this.state.pokemon?.name}</h3>
        </div>
        <div className="pokemon-card__info-box">
          <div>
            <p>Dimensions:</p>
            <p>
              weight: {this.state.pokemon?.weight} / height:{' '}
              {this.state.pokemon?.height}
            </p>
          </div>

          <ul className="pokemon-card__stats-list">
            {this.state.pokemon?.stats.map((stat) => (
              <li
                key={this.state.pokemon?.name + stat.stat.name}
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

export default CardPokemons;
