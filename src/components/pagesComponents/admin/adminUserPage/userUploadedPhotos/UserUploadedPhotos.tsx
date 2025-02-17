import { formatDate } from '@/common/utils'
import { useGetPostsByUserQuery } from '@/services/admin/postsService.generated'
import Image from 'next/image'
import { useRouter } from 'next/router'

import s from './userUploadedPhotos.module.scss'

export const UserUploadedPhotos = () => {
  const classNames = {
    container: s.container,
  }
  const { query } = useRouter()
  const userId = Number(query.id)
  const { data } = useGetPostsByUserQuery({ variables: { userId: 1758 } })

  if (!data?.getPostsByUser) {
    return null
  }

  const { items } = data.getPostsByUser

  return (
    <div className={classNames.container}>
      {items?.map(item => {
        return (
          <Image
            alt={`Image uploaded on ${formatDate(item.createdAt)}`}
            height={228}
            key={item.id}
            src={item.url ?? ''}
            width={234}
          />
        )
      })}
    </div>
  )
}
