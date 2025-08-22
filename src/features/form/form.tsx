import classes from './form.module.css';
import { Button } from '@/shared/ui';
import { FormInput, FormInputImg } from '.';
import { useForm } from 'react-hook-form';
import type { FormData, User } from '@/shared/user.types';

function Form() {
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    const newUser: User = data;

    console.log(newUser);
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={classes.column}>
        <FormInputImg {...{ register }} name="img" />
        <FormInput type="text" name="username" register={register} />
        <FormInput type="number" name="age" register={register} />
        <FormInput type="email" name="email" register={register} />
        <FormInput type="text" name="country" register={register} />
        <FormInput type="password" name="password" register={register} />
        <FormInput type="password" name="confirmPassword" register={register} />
        <FormInput type="checkbox" name="gender" register={register} />
        <FormInput type="checkbox" name="TAC" register={register} />
      </div>

      <Button name="submit" />
    </form>
  );
}

export default Form;
