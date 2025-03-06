import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'

export const useQueryParams = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { pathname, query } = router

  const userId = Array.isArray(query.id) ? query.id[0] : (query.id ?? '')

  const pathnameWithUserId = pathname.replace('[id]', userId)

  const setQueryParams = (params: Record<string, string>) => {
    if (!searchParams) {
      return null
    }
    const urlSearchParams = new URLSearchParams(searchParams.toString())

    Object.keys(params).forEach(key => {
      urlSearchParams.set(key, params[key])
    })
    router.push(`${pathnameWithUserId}?${urlSearchParams.toString()}`)
  }

  const resetQueryParams = () => {
    router.push(pathnameWithUserId)
  }

  return {
    resetQueryParams,
    searchParams,
    setQueryParams,
  }
}
