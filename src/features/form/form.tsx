import classes from './form.module.css';
import { Button } from '@/shared/ui';
import { FormInput } from '.';

type Props = {
  isShow: boolean;
};

function Form({ isShow }: Props) {
  return (
    <dialog open={isShow} className={classes.container}>
      <h2>Registration form</h2>

      <form className={classes.form}>
        <div className={classes.column}>
          <FormInput type="text" name="name" />
          <FormInput type="number" name="age" />
          <FormInput type="email" name="email" />
          <FormInput type="text" name="country" />
          <FormInput type="password" name="password" />
          <FormInput type="password" name="password2" />
        </div>

        <Button name="submit" />
      </form>
    </dialog>
  );
}

export default Form;
