import classes from './button.module.css';

type Props = {
  name: string;
  disabled?: boolean;
  onClick?: () => void;
};

function Button({ name, onClick, disabled = false }: Props) {
  return (
    <button
      disabled={disabled}
      className={classes.button}
      id={name}
      {...{ onClick }}
    >
      {name}
    </button>
  );
}

export default Button;
