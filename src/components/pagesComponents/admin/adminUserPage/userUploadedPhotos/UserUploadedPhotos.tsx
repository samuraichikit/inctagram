import { formatDate } from '@/common/utils'
import { useGetPostsByUserQuery } from '@/services/admin/postsService.generated'
import Image from 'next/image'
import { useRouter } from 'next/router'

export const UserUploadedPhotos = () => {
  const { query } = useRouter()
  const userId = Number(query.id)
  const { data } = useGetPostsByUserQuery({ variables: { userId } })

  if (!data?.getPostsByUser) {
    return null
  }

  const { items } = data.getPostsByUser

  return items?.map(item => {
    return (
      <Image
        alt={`Image uploaded on ${formatDate(item.createdAt)}`}
        height={228}
        key={item.id}
        src={item.url ?? ''}
        width={234}
      />
    )
  })
}
