import classes from './form.module.css';
import { Button } from '@/shared/ui';

import { useForm } from 'react-hook-form';
import { useUser } from '@/shared/store/useUser';
import { useState } from 'react';

import { formSchema, type User } from '@/shared/model';
import { convertFileToDataURL } from '@/shared/api/convert-to-base64';

import { zodResolver } from '@hookform/resolvers/zod';
import type z from 'zod';

function Form() {
  const add = useUser((state) => state.addUser);
  const [isShow, setIsShow] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
  } = useForm({ resolver: zodResolver(formSchema) });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const imgUrl = await convertFileToDataURL(data.img[0]);

    const newUser: User = {
      ...data,
      img: imgUrl,
    };

    add(newUser);
    reset();
  };

  const show = () => (isShow ? 'text' : 'password');

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={classes.column}>
        <label>
          <input {...register('img')} type="file" accept="image/*" />
        </label>

        <div className={classes.row}>
          <label className={classes.input}>
            <input
              type="text"
              {...register('username')}
              placeholder="username..."
            />
          </label>
          <label className={classes.input}>
            <input type="email" {...register('email')} placeholder="email..." />
          </label>

          <div className="flex-row">
            <label className="input__age ">
              <input type="number" {...register('age')} max={120} min={0} />
            </label>
            <label>
              <input type="checkbox" {...register('gender')} />
            </label>
            <label className="input__country">
              <input type="text" {...register('country')} />
            </label>
          </div>
        </div>
      </div>

      <div className="flex-row">
        <label className={classes.input}>
          <input
            type={show()}
            {...register('password')}
            placeholder="password..."
          />
        </label>

        <button type="button" onClick={() => setIsShow(!isShow)}>
          show
        </button>

        <label className={classes.input}>
          <input
            type={show()}
            {...register('confirmPassword')}
            placeholder="Confirm password..."
          />
        </label>
      </div>

      <Button name="submit" />

      <label>
        <input type="checkbox" {...register('TAC')} />
        Согласие на сбор и обработку данных
      </label>
    </form>
  );
}

export default Form;
