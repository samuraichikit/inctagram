import { Profile } from '@/components/ui/profile'
import { useGetProfileQuery } from '@/services/profile'

export default function UserProfile() {
  const { data } = useGetProfileQuery()

  return (
    <>
      <Profile />
    </>
  )
}
