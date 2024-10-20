import { z } from 'zod'

import { Locale } from '../../../locales/ru'
import { agreesToTOSSchema, emailSchema, passwordSchema, userNameSchema } from './commonSchemas'

export const signUpSchema = (t: Locale) => {
  return z
    .object({
      agreesToTOS: agreesToTOSSchema,
      email: emailSchema(t),
      password: passwordSchema(t),
      passwordConfirmation: passwordSchema(t),
      userName: userNameSchema(t),
    })
    .refine(data => data.password === data.passwordConfirmation, {
      message: t.schemaErrorMsg.passwordMatch,
      path: ['passwordConfirmation'],
    })
}
