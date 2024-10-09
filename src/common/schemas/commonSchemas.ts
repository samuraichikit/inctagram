import { z } from 'zod'

const PASSWORD_REGEX =
  /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])[A-Za-z0-9!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]+$/

const USER_NAME_REGEX = /^[a-zA-Z0-9_-]*$/

export const userNameSchema = z.string().min(6).max(30).regex(USER_NAME_REGEX).trim()

export const emailSchema = z.string().email({
  message: `The email must match the format 
example@example.com`,
})

export const passwordSchema = z
  .string()
  .min(6, { message: 'Minimum number of characters 6' })
  .max(20, { message: 'Maximum number of characters 20' })
  .regex(PASSWORD_REGEX, {
    message: `Password must contain 0-9, a-z, A-Z, ! "
# $ % & ' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^
_\` { | } ~`,
  })
  .trim()

export const agreesToTOSSchema = z.boolean()
