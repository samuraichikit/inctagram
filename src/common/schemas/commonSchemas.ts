import { z } from 'zod'

const PASSWORD_REGEX =
  /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])[A-Za-z0-9!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]+$/

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
