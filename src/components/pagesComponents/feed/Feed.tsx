import { useEffect, useRef, useState } from 'react'

import { useElementInView } from '@/common/hooks/useElementInView'
import { useGetFollowersPublicationsQuery } from '@/services/pageHomeService'

import s from './feed.module.scss'

import { Publication } from './publication'

export const Feed = () => {
  const classNames = {
    container: s.container,
  }
  const prevIsInView = useRef(false)
  const [endCursorPostId, setEndCursorPostId] = useState(0)
  const { isInView, targetRef } = useElementInView({ threshold: 0.5 })

  const { data } = useGetFollowersPublicationsQuery({ endCursorPostId })
  const publications = data?.items ?? []
  const isDisplayDivWithRef = publications?.length > 0

  useEffect(() => {
    if (isInView && data?.nextCursor && !prevIsInView.current) {
      setEndCursorPostId(data.nextCursor)
      prevIsInView.current = isInView
    } else if (!isInView) {
      prevIsInView.current = false
    }
  }, [isInView, data?.nextCursor])

  return (
    <div className={classNames.container}>
      {publications?.map(publication => (
        <Publication
          avatarOwner={publication.avatarOwner}
          avatarsSrc={publication.avatarWhoLikes}
          createdAt={publication.createdAt}
          description={publication.description}
          images={publication.images}
          isLiked={publication.isLiked}
          key={publication.id}
          likesCount={publication.likesCount}
          postId={publication.id}
          userName={publication.userName}
        />
      ))}
      {isDisplayDivWithRef && <div ref={targetRef} />}
    </div>
  )
}
