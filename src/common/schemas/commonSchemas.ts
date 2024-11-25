import { z } from 'zod'

import { Locale } from '../../../locales/ru'
import {
  ABOUT_ME_REGEX,
  EMAIL_EXAMPLE,
  FIRST_LAST_NAME_REGEX,
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

export const dateOfBirthSchema = (t: Locale) => {
  return z
    .string()
    .trim()
    .refine(
      val => {
        const today = new Date()
        const birthdate = new Date(val)
        const age = today.getFullYear() - birthdate.getFullYear()

        return age >= 13
      },
      { message: `A user under 13 cannot create a profile.` }
    )
    .optional()
}

export const countrySchema = (t: Locale) => {
  return z.string().trim().optional()
}

export const citySchema = (t: Locale) => {
  return z.string().trim().optional()
}

export const regionSchema = (t: Locale) => {
  return z.string().trim().optional()
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

export const firstLastNameSchema = (t: Locale) => {
  return z
    .string()
    .min(1, { message: t.schemaErrorMsg.minFirstLastName })
    .max(50, { message: t.schemaErrorMsg.maxFirstLastName })
    .regex(FIRST_LAST_NAME_REGEX)
    .trim()
}

export const aboutMeSchema = (t: Locale) => {
  return z
    .string()
    .min(0, { message: t.schemaErrorMsg.minPassword })
    .max(200, { message: t.schemaErrorMsg.maxPassword })
    .regex(ABOUT_ME_REGEX)
    .trim()
    .optional()
}

export const agreesToTOSSchema = z.boolean().refine(value => value)
