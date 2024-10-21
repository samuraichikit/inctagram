import { GitHubIcon } from '@/assets/icons/GitHubIcon'
import { useGithubAuthQuery } from '@/services/baseApi'
import { skipToken } from '@reduxjs/toolkit/query'

export const GithubButton = () => {
  const { data, isError, isLoading } = useGithubAuthQuery(skipToken)

  console.log(data)
  console.log(isError)

  const handlerLogin = () => {
    window.location.assign('https://inctagram.work/api/v1/auth/github/login')
    const params = new URLSearchParams(window.location.search)
    const accessToken = params.get('accessToken')
    const email = params.get('email')

    console.log(accessToken)
    console.log(email)

    accessToken ? localStorage.setItem('accessToken', accessToken) : console.error(isError)
  }

  return <GitHubIcon height={36} onClick={handlerLogin} width={36} />
}
