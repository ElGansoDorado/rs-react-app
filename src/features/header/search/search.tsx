import classes from './search.module.css';
import { Component, type ReactNode } from 'react';
import { getLineSearch } from '../../../shared/api/search-save';

interface SearchProps {
  searchPokemons: (search: string) => Promise<void>;
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

  handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await this.props.searchPokemons(this.state.search);
  };

  render(): ReactNode {
    return (
      <form onSubmit={this.handleSubmit} className={classes.container}>
        <input
          type="search"
          name="search"
          className={classes.search}
          placeholder="Search..."
          onChange={(e) =>
            this.setState({
              search: e.target.value.trim(),
            })
          }
          value={this.state.search}
        />

        <input
          type="submit"
          name="search-button"
          value="search"
          className={classes.button}
        />
      </form>
    );
  }
}

export default Search;
