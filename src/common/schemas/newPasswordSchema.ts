import { z } from 'zod'

import { Locale } from '../../../locales/ru'
import { passwordSchema } from './commonSchemas'

export const newPasswordSchema = (t: Locale) => {
  return z
    .object({
      newPassword: passwordSchema(t),
      passwordConfirmation: passwordSchema(t),
    })
    .refine(data => data.newPassword === data.passwordConfirmation, {
      message: t.schemaErrorMsg.passwordMatch,
      path: ['passwordConfirmation'],
    })
}
