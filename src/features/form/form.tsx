import classes from './form.module.css';
import { Button } from '@/shared/ui';

import { useForm } from 'react-hook-form';
import { useUser, useShowForm } from '@/shared/store';
import { useState } from 'react';

import { formSchema, type User } from '@/shared/model';
import { convertFileToDataURL } from '@/shared/api/convert-to-base64';

import { zodResolver } from '@hookform/resolvers/zod';
import type z from 'zod';

function Form() {
  const close = useShowForm((state) => state.showFormOne);
  const add = useUser((state) => state.addUser);
  const [isShow, setIsShow] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const imgUrl = await convertFileToDataURL(data.img[0]);

    const newUser: User = {
      ...data,
      img: imgUrl,
    };

    add(newUser);
    reset();
    close();
  };

  const show = () => (isShow ? 'text' : 'password');

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={classes.column}>
        <label className="">
          <input {...register('img')} type="file" accept="image/*" />
        </label>

        <div className={classes.row}>
          <label
            className={`${classes.input} ${errors.username && classes.error}`}
          >
            <input
              type="text"
              {...register('username')}
              placeholder={
                errors.username ? errors.username.message : 'username...'
              }
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
        <label
          className={`${classes.input} ${errors.password && classes.error}`}
        >
          <input
            type={show()}
            {...register('password')}
            placeholder={
              errors.password ? errors.password.message : 'enter password...'
            }
          />
        </label>

        <button type="button" onClick={() => setIsShow(!isShow)}>
          show
        </button>

        <label
          className={`${classes.input} ${errors.confirmPassword && classes.error}`}
        >
          <input
            type={show()}
            {...register('confirmPassword')}
            placeholder={
              errors.confirmPassword
                ? errors.confirmPassword.message
                : 'Confirm password...'
            }
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
