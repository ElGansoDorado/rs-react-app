import classes from './loader.module.css';
import { Suspense } from 'react';

type Props = {
  children: React.ReactNode;
};

export function SuspenseLoader({ children }: Props) {
  return <Suspense fallback={<Loader />}>{children}</Suspense>;
}

function Loader() {
  return (
    <div className={classes.container}>
      <p className={classes.spinner}>߷</p>
      <h3>Loading...</h3>
    </div>
  );
}

export default Loader;
