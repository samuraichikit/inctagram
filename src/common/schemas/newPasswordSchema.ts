import { z } from 'zod'

import { passwordSchema } from './commonSchemas'

export const newPasswordSchema = z
  .object({
    newPassword: passwordSchema,
    passwordConfirmation: passwordSchema,
  })
  .refine(data => data.newPassword === data.passwordConfirmation, {
    message: 'Passwords must match',
    path: ['passwordConfirmation'],
  })
