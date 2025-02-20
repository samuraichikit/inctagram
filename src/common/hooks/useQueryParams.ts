import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'

export const useQueryParams = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { pathname } = router

  const setQueryParams = (params: Record<string, string>) => {
    if (!searchParams) {
      return null
    }
    const urlSearchParams = new URLSearchParams(searchParams.toString())

    Object.keys(params).forEach(key => {
      urlSearchParams.set(key, params[key])
    })
    router.push(`${pathname}?${urlSearchParams.toString()}`)
  }

  return {
    searchParams,
    setQueryParams,
  }
}
