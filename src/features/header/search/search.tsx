import classes from './search.module.css';
import { Component, type ReactNode } from 'react';
import { getPokemons } from '../../../shared/api/get-pokemon';
import type { PokemonType } from '../../../shared/model/pokemon.type';
import {
  checkLineSearchSave,
  getLineSearch,
  setLineSearch,
} from './search-save';

interface SearchProps {
  setPokemonsList: (newList: PokemonType[]) => void;
  setIsLoading: (load: boolean) => void;
}

interface SearchState {
  search: string;
}

export type Props = Readonly<SearchProps>;

class Search extends Component<Props, SearchState> {
  constructor(props: Props) {
    super(props);

    this.state = {
      search: getLineSearch(),
    };
  }

  componentDidMount(): void {
    this.props.setIsLoading(true);

    getPokemons(this.state.search).then((list) => {
      this.props.setPokemonsList(list);
      this.props.setIsLoading(false);
    });
  }

  handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!checkLineSearchSave(this.state.search)) {
      this.props.setIsLoading(true);
      this.props.setPokemonsList(await getPokemons(this.state.search));
      setLineSearch(this.state.search);
    }
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
