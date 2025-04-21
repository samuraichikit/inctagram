type UserPost = {
  id: number | string
  postId: number | string
}

export const ROUTES = {
  AUTH: {
    EXPIRED_LINK: '/auth/expiredLink',
    FORGOT_PASSWORD: '/auth/forgotPassword',
    PRIVACY_POLICY: '/auth/privacyPolicy',
    RECOVERY: '/auth/recovery',
    REGISTRATION_CONFIRMATION: '/auth/registration-confirmation',
    SIGN_IN: '/auth/signIn',
    SIGN_UP: '/auth/signUp',
    TERMS_OF_SERVICE: '/auth/termsOfService',
  },
  MAIN: '/',
  PROFILE: {
    SETTINGS: {
      DEVICES: (id: number | string) => `/profile/settings/devices/${id}`,
      GENERAL: (id: number | string) => `/profile/settings/general/${id}`,
      MANAGEMENT: (id: number | string) => `/profile/settings/management/${id}`,
      PAYMENTS: (id: number | string) => `/profile/settings/payments/${id}`,
    },
    USER_POST: ({ id, postId }: UserPost) => `/profile/${id}/${postId}`,
    USER_PROFILE: (id: number | string) => `/profile/${id}`,
  },
}
