// import classes from './form.module.css';
// import { Button } from '@/shared/ui';
// import { FormInput, FormInputImg } from '.';
// import type { FormData, User } from '@/shared/model/user.types';
// import { useUser } from '@/shared/store/useUser';
// import { convertFileToDataURL } from '@/shared/api/convert-to-base64';

// function Form() {
//   const add = useUser((state) => state.addUser);

//   const onSubmit = async (data: FormData) => {
//     const imgUrl = await convertFileToDataURL(data.img[0]);

//     const newUser: User = {
//       ...data,
//       img: imgUrl,
//     };

//     add(newUser);
//   };

//   return (
//     <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
//       <div className={classes.column}>
//         {/* <FormInputImg {...{ register }} name="img" /> */}

//         <div className={classes.row}>
//           {/* <FormInput type="text" name="username" register={register} />
//           <FormInput type="email" name="email" register={register} /> */}

//           <div className="flex-row">
//             <label className="input__age ">
//               <input type="number" {...register('age')} />
//             </label>
//             <label>
//               <input type="checkbox" {...register('gender')} />
//             </label>
//             <label className="input__country">
//               <input type="text" {...register('country')} />
//             </label>
//           </div>
//         </div>
//       </div>

//       <div className={classes.column}>
//         <FormInput type="password" name="password" register={register} />
//         <FormInput type="password" name="confirmPassword" register={register} />
//       </div>

//       <Button name="submit" />

//       <label>
//         <input type="checkbox" {...register('TAC')} />
//         Согласие на сбор и обработку данных
//       </label>
//     </form>
//   );
// }

// export default Form;
