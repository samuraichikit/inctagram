import { useMeQuery } from '@/services/auth'

export const useAuth = () => {
  const { data: meData, isError, isLoading } = useMeQuery()

  const isAuth = !isError && !isLoading

  return { isAuth, isError, isLoading, meData }
}
