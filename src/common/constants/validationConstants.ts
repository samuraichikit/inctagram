export const PASSWORD_REGEX =
  /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])[A-Za-z0-9!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]+$/

export const USER_NAME_REGEX = /^[a-zA-Z0-9_-]*$/

export const PASSWORD_ALLOWED_CHARACTERS = `0-9, a-z, A-Z, ! "
# $ % & ' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^
_\` { | } ~`

export const EMAIL_EXAMPLE = 'example@example.com'
