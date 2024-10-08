import { z } from 'zod'

import { emailSchema, passwordSchema, userNameSchema } from './commonSchemas'

export const signUpSchema = z.object({
  agreesToTOS: z.literal(true),
  email: emailSchema,
  password: passwordSchema,
  passwordConfirmation: passwordSchema,
  username: userNameSchema,
})
