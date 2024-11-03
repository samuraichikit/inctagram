import { z } from 'zod'

import { Locale } from '../../../locales/ru'
import {
  EMAIL_EXAMPLE,
  PASSWORD_ALLOWED_CHARACTERS,
  PASSWORD_REGEX,
  USER_NAME_REGEX,
} from '../constants'

export const userNameSchema = (t: Locale) => {
  return z
    .string()
    .min(6, { message: t.schemaErrorMsg.minName })
    .max(30, { message: t.schemaErrorMsg.maxName })
    .regex(USER_NAME_REGEX)
    .trim()
}

export const emailSchema = (t: Locale) => {
  return z.string().email({
    message: `${t.schemaErrorMsg.emailFormat} ${EMAIL_EXAMPLE}`,
  })
}

export const passwordSchema = (t: Locale) => {
  return z
    .string()
    .min(6, { message: t.schemaErrorMsg.minPassword })
    .max(20, { message: t.schemaErrorMsg.maxPassword })
    .regex(PASSWORD_REGEX, {
      message: `${t.schemaErrorMsg.passwordContain} ${PASSWORD_ALLOWED_CHARACTERS}`,
    })
    .trim()
}

export const agreesToTOSSchema = z.boolean().refine(value => value)
