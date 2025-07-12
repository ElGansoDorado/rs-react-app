import { Component } from 'react';

import classes from './header.module.css';
import { getPokemons } from '../../shared/api/get-pokemon';
import type { Pokemon } from '../../shared/model/pokemon.type';

interface HeaderProps {
  setPokemonsList: (newList: Pokemon[]) => void;
}

type Props = Readonly<HeaderProps>;

class Header extends Component<Props> {
  state = {
    search: '',
  };

  handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.props.setPokemonsList(await getPokemons(this.state.search));
  };

  render() {
    return (
      <header className={classes.header}>
        <div className="container flex-row">
          <h1 className={classes.title}>Pokemon list</h1>

          <form onSubmit={this.handleSubmit} className={classes.search}>
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

            <input type="submit" name="search-button" value="search" />
          </form>
        </div>
      </header>
    );
  }
}

export default Header;
