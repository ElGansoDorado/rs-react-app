import { Component } from 'react';

import classes from './header.module.css';
import type { pokemon, pokemonResponse } from '../../shared/model/pokemon.type';

interface HeaderProps {
  setPokemonsList: (newList: pokemon[]) => void;
}

type Props = Readonly<HeaderProps>;

class Header extends Component<Props> {
  state = {
    search: '',
  };

  onSearch = async () => {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${this.state.search}`
    );

    const pokemonLists: pokemonResponse = await response.json();

    console.log(pokemonLists.results);
    this.props.setPokemonsList(pokemonLists.results);
  };

  render() {
    return (
      <header className={classes.header}>
        <div className="container flex-row">
          <h1 className={classes.title}>Pokemon list</h1>

          <form className={classes.search}>
            <input
              type="search"
              name="search"
              placeholder="search..."
              onChange={(e) =>
                this.setState({
                  search: e.target.value,
                })
              }
              value={this.state.search}
            />

            <input
              type="button"
              name="search-button"
              value="search"
              onClick={this.onSearch}
            />
          </form>
        </div>
      </header>
    );
  }
}

export default Header;
