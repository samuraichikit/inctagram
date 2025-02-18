import { useEffect, useRef, useState } from 'react'

import { useElementInView } from '@/common/hooks/useElementInView'
import { formatDate } from '@/common/utils'
import {
  useGetPostsByUserLazyQuery,
  useGetPostsByUserQuery,
} from '@/services/admin/postsService.generated'
import { ImagePost } from '@/services/admin/types'
import Image from 'next/image'
import { useRouter } from 'next/router'

import s from './userUploadedPhotos.module.scss'

export const UserUploadedPhotos = () => {
  const classNames = {
    container: s.container,
  }
  const { query } = useRouter()
  const userId = Number(query.id)
  const [pageNumber, setPageNumber] = useState(1)
  const endCursorPostIdRef = useRef<null | number>(null)
  const { data } = useGetPostsByUserQuery({ variables: { userId } })
  const [getPostsByUserLazy] = useGetPostsByUserLazyQuery()
  const [photos, setPhotos] = useState<ImagePost[]>([])
  const { isInView, targetRef } = useElementInView({ threshold: 0.6 })

  const { items, pagesCount } = data?.getPostsByUser ?? {}
  const totalPagesCount = pagesCount ?? 0

  const isSetNextPage = isInView && pageNumber < totalPagesCount

  useEffect(() => {
    if (pageNumber === 1 && items?.length) {
      setPhotos([...items])
    }
  }, [pageNumber, items])

  useEffect(() => {
    const fetchPosts = async () => {
      const { data: lazyData } = await getPostsByUserLazy({
        variables: { endCursorId: endCursorPostIdRef.current, userId: 1758 },
      })

      if (lazyData?.getPostsByUser.items) {
        setPhotos(prev => [...prev, ...(lazyData?.getPostsByUser.items as ImagePost[])])
      }
    }

    if (pageNumber > 1 && pageNumber < totalPagesCount) {
      fetchPosts()
    }
  }, [pageNumber])

  useEffect(() => {
    endCursorPostIdRef.current = photos[photos.length - 1]?.id ?? null
  }, [photos])

  useEffect(() => {
    if (isSetNextPage) {
      setPageNumber(prev => prev + 1)
    }
  }, [isSetNextPage])

  return (
    <div className={classNames.container}>
      {photos?.map((item, index) => {
        return (
          <Image
            alt={`Image uploaded on ${formatDate(item.createdAt)}`}
            height={228}
            key={item.id}
            ref={index === photos.length - 1 ? targetRef : null}
            src={item.url ?? ''}
            width={234}
          />
        )
      })}
    </div>
  )
}
