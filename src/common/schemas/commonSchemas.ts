import { z } from 'zod'

import { Locale } from '../../../locales/ru'
import {
  ABOUT_ME_REGEX,
  DATE_REGEX,
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
    .regex(DATE_REGEX, {
      message: `Date format xx.yy.zzzz`,
    })
    .trim()
}

export const countrySchema = (t: Locale) => {
  return z.string().trim()
}

export const citySchema = (t: Locale) => {
  return z.string().trim()
}

export const regionSchema = (t: Locale) => {
  return z.string().trim()
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
}

export const agreesToTOSSchema = z.boolean().refine(value => value)
