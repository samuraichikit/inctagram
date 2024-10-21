import { GoogleIcon } from '@/assets/icons/GoogleIcon'
import { useGoogleAuthMutation } from '@/services/baseApi'

export const GoogleButton = () => {
  const login = () => {
    const CLIENT_ID = '617342613759-f3kbvgm8l310fn40vh6qna2pv8u2uccr.apps.googleusercontent.com'
    const redirectUrl = 'https://localhost:3000'
    const scope = 'email profile'
    const URL = `https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${redirectUrl}&amp;response_type=code&amp;client_id=${CLIENT_ID}&amp;scope=${scope}`
    const ggg = `https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${redirectUrl}&response_type=code&client_id=${CLIENT_ID}&scope=email%20profile`
    const url = `https://accounts.google.com/o/oauth2/v2/auth?scope=${scope}&response_type=code&redirect_uri=${redirectUrl}&client_id=${CLIENT_ID}`

    window.location.assign(URL)
  }

  const [googleLogin, { data, isError, isLoading }] = useGoogleAuthMutation()

  console.log(data)
  console.log(isError)

  const handelLogin = () => {
    login()
    const hash = window.location.hash
    const code = new URLSearchParams(hash.substring(1)).get('code')

    if (code) {
      googleLogin({ code })
        .unwrap()
        .then(data => {
          localStorage.setItem('accessToken', data.accessToken)
          console.log(data.email)
        })
    } else {
      console.log(isError)
    }
  }

  return <GoogleIcon height={36} onClick={handelLogin} width={36} />
}
