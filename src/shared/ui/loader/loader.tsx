import classes from './loader.module.css';

function Loader() {
  return (
    <div className={classes.container}>
      <p className={classes.spinner}>߷</p>
      <h3>Loading...</h3>
    </div>
  );
}

export default Loader;
