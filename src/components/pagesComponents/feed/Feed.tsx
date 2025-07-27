import { useEffect, useRef, useState } from 'react'

import { useElementInView } from '@/common/hooks/useElementInView'
import { useGetFollowersPublicationsQuery } from '@/services/pageHomeService'

import s from './feed.module.scss'

import { Publication } from './publication'

export const Feed = () => {
  const classNames = {
    container: s.container,
  }
  const skipFirstScroll = useRef(true)
  const [endCursorPostId, setEndCursorPostId] = useState(0)
  const { isInView, targetRef } = useElementInView({ threshold: 0.5 })

  const { data } = useGetFollowersPublicationsQuery({ endCursorPostId })
  const publications = data?.items

  useEffect(() => {
    if (isInView && data?.nextCursor) {
      if (skipFirstScroll.current) {
        skipFirstScroll.current = false
      } else {
        setEndCursorPostId(data.nextCursor)
      }
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
          key={publication.id}
          likesCount={publication.likesCount}
          postId={publication.id}
          userName={publication.userName}
        />
      ))}
      <div ref={targetRef} />
    </div>
  )
}
