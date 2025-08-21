import classes from './form-input.module.css';

type Props = {
  name: string;
  type: string;
};

function FormInput({ name, type = 'text' }: Props) {
  return (
    <label className={classes.input}>
      <input {...{ name, type }} placeholder={`${name}...`} />
    </label>
  );
}

export default FormInput;
