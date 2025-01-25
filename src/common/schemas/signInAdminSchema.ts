import { emailSchema } from '@/common/schemas/index'
import { z } from 'zod'

import { Locale } from '../../../locales/ru'

export const signInAdminSchema = (t: Locale) => {
  return z.object({
    email: emailSchema(t),
    password: z.string(),
  })
}
