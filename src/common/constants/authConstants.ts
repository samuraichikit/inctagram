const LOCAL_URL = 'http://localhost:3000'
const PRODUCTION_URL = 'https://samuraichiki.org'
const SCOPE = 'email profile'
const REDIRECT_URL = process.env.NODE_ENV === 'production' ? PRODUCTION_URL : LOCAL_URL

export const GOOGLE_URL = `https://accounts.google.com/o/oauth2/v2/auth?scope=${SCOPE}&response_type=code&redirect_uri=${REDIRECT_URL}&client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`
