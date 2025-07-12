import { Component } from 'react';

import classes from './header.module.css';

class Header extends Component {
  state = {
    search: '',
  };

  onSearch = async () => {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${this.state.search}`
    );

    const pokemonLists = await response.json();

    console.log(pokemonLists);
  };

  render() {
    return (
      <header className={classes.header}>
        <div className="container flex-row">
          <h1 className={classes.title}>Class components</h1>

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
