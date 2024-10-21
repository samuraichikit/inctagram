import { useGetProfileQuery } from '@/services/profile'

export default function UserProfile() {
  const { data } = useGetProfileQuery()

  return (
    <>
      <h1>{data?.userName}</h1>
    </>
  )
}
