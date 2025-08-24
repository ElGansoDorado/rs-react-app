import type { UseFormRegister } from 'react-hook-form';
import classes from './form-input.module.css';

import type { FormData } from '@/shared/model/user.types';

type Props = {
  type?: string;
  register: UseFormRegister<FormData>;
  name: keyof FormData;
};

function FormInput({ name, register, type = 'text' }: Props) {
  return (
    <label className={classes.input}>
      <input
        {...{ name, type }}
        {...register(name)}
        placeholder={`${name}...`}
      />
    </label>
  );
}

export default FormInput;
