import { z } from 'zod'

import { agreesToTOSSchema, emailSchema, passwordSchema, userNameSchema } from './commonSchemas'

export const signUpSchema = z
  .object({
    agreesToTOS: agreesToTOSSchema,
    email: emailSchema,
    password: passwordSchema,
    passwordConfirmation: passwordSchema,
    username: userNameSchema,
  })
  .refine(data => data.password === data.passwordConfirmation, {
    message: 'Passwords must match',
    path: ['passwordConfirmation'],
  })
