import { z } from 'zod';

export const CreateUserDTO = z.object({
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string',
    })
    .email({ message: 'Email must be a valid email address' }),

  password: z
    .string({
      required_error: 'Password is required',
      invalid_type_error: 'Password must be a string',
    })
    .min(8, { message: 'Password be 8 or more characters long' }),

  name: z
    .string({
      required_error: 'Name is required',
      invalid_type_error: 'Name must be a string',
    })
    .min(3, { message: 'Name must be 3 or more characters long' }),
});

export type CreateUserDTO = z.infer<typeof CreateUserDTO>;

export const LoginUserDTO = CreateUserDTO.omit({ name: true });
export type loginUserDTO = z.infer<typeof LoginUserDTO>;
