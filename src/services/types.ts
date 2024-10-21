export interface ResponseGithubAuth {
  accessToken: string
  email: string
}

export interface GoogleAuthArgs {
  code: string
}

export interface GoogleAuthResponse {
  accessToken: string
  email: string
}
