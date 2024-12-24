export type MeResponse = {
  email: string
  isBlocked: boolean
  userId: number
  userName: string
}

export type SignUpArgs = {
  email: string
  password: string
  userName: string
}

export type ErrorResponse = {
  error: string
  messages: ErrorMessage[]
  statusCode: number
}

export type ErrorMessage = {
  field: string
  message: string
}

export type RegistrationConfirmationArgs = {
  confirmationCode: string
}

export type RegistrationEmailResendingArgs = {
  email: string
}

export type SignInArgs = {
  email: string
  password: string
}

export type SignInResponseArgs = {
  accessToken: string
}

export type GoogleAuthResponse = {
  accessToken: string
  email: string
}

export type GoogleAuthArgs = {
  code: string
}
