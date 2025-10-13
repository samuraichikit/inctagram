import { emailSchema, passwordSchema } from '@/common/schemas/index'
import { z } from 'zod'

import { Locale } from '../../../locales/ru'

export const signInSchema = (t: Locale) => {
  return z.object({
    email: emailSchema(t),
    password: passwordSchema(t),
  })
}
