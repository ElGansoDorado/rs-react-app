import { Component, type ReactNode } from 'react';

import classes from './header.module.css';
import Search from './search/search';
import { type Props } from './search/search';

class Header extends Component<Props> {
  render(): ReactNode {
    return (
      <header className={classes.header}>
        <div className="container flex-row">
          <h1 className={classes.title}>Pokemon list</h1>

          <Search {...this.props} />
        </div>
      </header>
    );
  }
}

export default Header;
