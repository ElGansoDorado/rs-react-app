import z from 'zod';

export const formSchema = z
  .object({
    username: z.string().min(2, 'name cannot be shorter than 2 characters'),

    email: z
      .string({
        error: 'Email обязателен',
      })
      .email('Неверный email'),

    password: z
      .string({
        error: 'Password обязателен',
      })
      .min(8, 'Password must be at least 8 characters')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number'),

    confirmPassword: z.string({
      error: 'confirmPassword обязателен',
    }),

    age: z.coerce
      .number()
      .min(0, 'Age cannot be negative')
      .max(120, 'Age cannot be more than 120 years'),

    gender: z.string({
      error: 'Gender is required',
    }),

    TAC: z
      .boolean()
      .refine(
        (val) => val === true,
        'You must accept the terms and conditions'
      ),

    img: z
      .instanceof(FileList)
      .refine((files) => files.length > 0, 'Please select a file'),

    country: z.string().min(1, 'Please select a country'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'пароли не совпадают',
  });
