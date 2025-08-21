import classes from './button.module.css';

type Props = {
  name: string;
  onClick?: () => void;
};

function Button({ name, onClick }: Props) {
  return (
    <button className={classes.button} id={name} {...{ onClick }}>
      {name}
    </button>
  );
}

export default Button;
