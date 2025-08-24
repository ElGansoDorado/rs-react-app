import classes from './form.module.css';
import { Button } from '@/shared/ui';
import { useUser, useShowForm, useCountry } from '@/shared/store';
import { useState, useRef, type FormEvent } from 'react';
import { type User } from '@/shared/model';
import { convertFileToDataURL } from '@/shared/api/convert-to-base64';
import { formSchema } from '@/shared/model';
import { ZodError } from 'zod';

function FormRef() {
  const close = useShowForm((state) => state.showFormOne);
  const add = useUser((state) => state.addUser);
  const countryList = useCountry((state) => state.countries);
  const [isShow, setIsShow] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getFormData = () => {
    if (!formRef.current) return null;

    const formData = new FormData(formRef.current);
    const file = fileInputRef.current?.files as FileList;

    return {
      username: formData.get('username_2') as string,
      email: formData.get('email_2') as string,
      age: formData.get('age_2') ? Number(formData.get('age')) : 1,
      gender: formData.get('gender_2') as string,
      country: formData.get('country_2') as string,
      password: formData.get('password_2') as string,
      confirmPassword: formData.get('confirmPassword_2') as string,
      TAC: formData.get('TAC_2') === 'on',
      img: file,
    };
  };

  const validateForm = () => {
    const formData = getFormData();
    if (!formData) return false;

    try {
      formSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof ZodError) {
        const newErrors: Record<string, string> = {};
        error.issues.forEach((issue) => {
          if (issue.path[0]) {
            newErrors[issue.path[0] as string] = issue.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!validateForm()) return;

    const formData = getFormData();
    if (!formData || !formData.img) return;

    try {
      const imgUrl = await convertFileToDataURL(formData.img[0]);

      const newUser: User = {
        username: formData.username,
        email: formData.email,
        age: formData.age,
        gender: formData.gender,
        country: formData.country,
        password: formData.password,
        TAC: formData.TAC,
        img: imgUrl,
      };

      add(newUser);
      formRef.current?.reset();
      close();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const show = () => (isShow ? 'text' : 'password');

  return (
    <form ref={formRef} className={classes.form} onSubmit={onSubmit}>
      <div className={classes.column}>
        <label className={classes.inputImg}>
          <input ref={fileInputRef} name="img_2" type="file" accept="image/*" />
        </label>

        <div className={classes.row}>
          <label
            className={`${classes.input} ${errors.username && classes.error}`}
          >
            <input
              name="username_2"
              type="text"
              placeholder={errors.username || 'username...'}
              autoComplete="name"
            />
          </label>

          <label
            className={`${classes.input} ${errors.email && classes.error}`}
          >
            <input
              name="email_2"
              type="email"
              placeholder={errors.email || 'email...'}
            />
          </label>

          <div className="flex-row">
            <label className={`input__age ${errors.age && classes.error}`}>
              <input
                name="age_2"
                type="number"
                max={120}
                min={0}
                placeholder={errors.age || 'age...'}
              />
            </label>

            <div className={classes.gender}>
              <input type="radio" name="gender_2" value="M" />
              <label htmlFor="M">M</label>

              <input type="radio" name="gender_2" value="W" />
              <label htmlFor="W">W</label>
              {errors.gender && (
                <span className={classes.errorText}>{errors.gender}</span>
              )}
            </div>

            <label
              className={`${classes.input} ${errors.country && classes.error}`}
            >
              <input
                name="country_2"
                list="country-list_2"
                className={classes.country}
                placeholder={errors.country || 'country...'}
              />
              <datalist id="country-list_2">
                {countryList.map((item) => (
                  <option key={item + '_2'} value={item}></option>
                ))}
              </datalist>
            </label>
          </div>
        </div>
      </div>

      <div className="flex-row">
        <label
          className={`${classes.input} ${errors.password && classes.error}`}
        >
          <input
            name="password_2"
            type={show()}
            placeholder={errors.password || 'enter password...'}
          />
        </label>

        <button type="button" onClick={() => setIsShow(!isShow)}>
          show
        </button>

        <label
          className={`${classes.input} ${errors.confirmPassword && classes.error}`}
        >
          <input
            name="confirmPassword_2"
            type={show()}
            placeholder={errors.confirmPassword || 'confirm password...'}
          />
        </label>
      </div>

      <Button name="submit_2" />

      <label className={classes.checkbox}>
        <input name="TAC_2" type="checkbox" />
        accept Terms and Conditions agreement
        {errors.TAC && <span className={classes.errorText}>{errors.TAC}</span>}
      </label>
    </form>
  );
}

export default FormRef;
