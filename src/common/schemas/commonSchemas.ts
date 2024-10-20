import { z } from 'zod'

import { Locale } from '../../../locales/ru'

const PASSWORD_REGEX =
  /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])[A-Za-z0-9!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]+$/

const USER_NAME_REGEX = /^[a-zA-Z0-9_-]*$/

const PASSWORD_ALLOWED_CHARACTERS = `0-9, a-z, A-Z, ! "
# $ % & ' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^
_\` { | } ~`

const EMAIL_EXAMPLE = 'example@example.com'

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
