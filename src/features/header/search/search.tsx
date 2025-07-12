import classes from './search.module.css';
import { Component, type ReactNode } from 'react';
import { getPokemons } from '../../../shared/api/get-pokemon';
import type { Pokemon } from '../../../shared/model/pokemon.type';
import { getSearch, setSearch } from './search-save';

interface SearchProps {
  setPokemonsList: (newList: Pokemon[]) => void;
}

interface SearchState {
  search: string;
}

export type Props = Readonly<SearchProps>;

class Search extends Component<Props, SearchState> {
  constructor(props: Props) {
    super(props);

    this.state = {
      search: getSearch(),
    };
  }

  componentDidMount(): void {
    getPokemons(this.state.search).then((list) => {
      this.props.setPokemonsList(list);
    });
  }

  handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.props.setPokemonsList(await getPokemons(this.state.search));
    setSearch(this.state.search);
  };

  render(): ReactNode {
    return (
      <form onSubmit={this.handleSubmit} className={classes.search}>
        <input
          type="search"
          name="search"
          placeholder="search..."
          onChange={(e) =>
            this.setState({
              search: e.target.value.trim(),
            })
          }
          value={this.state.search}
        />

        <input type="submit" name="search-button" value="search" />
      </form>
    );
  }
}

export default Search;
