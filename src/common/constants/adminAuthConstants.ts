export const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL
export const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD
export const ADMIN_ENCODED_CREDENTIALS = Buffer.from(`${ADMIN_EMAIL}:${ADMIN_PASSWORD}`).toString(
  'base64'
)
