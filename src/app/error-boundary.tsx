import { Component, type ReactNode } from 'react';

interface ErrorProps {
  children: ReactNode;
}

type Props = Readonly<ErrorProps>;

class ErrorBoundary extends Component<Props> {
  state = {
    errorMessage: '',
  };

  static getDerivedStateFromError(error: Error) {
    console.log('hi');
    return { errorMessage: error.toString() };
  }

  componentDidCatch(error: Error) {
    console.log(error.toString());
  }

  render(): ReactNode {
    if (this.state.errorMessage) {
      return (
        <>
          <main className="container">
            <h2>{this.state.errorMessage}</h2>
            <button onClick={() => location.reload()} className="button">
              Reload page
            </button>
          </main>
        </>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
