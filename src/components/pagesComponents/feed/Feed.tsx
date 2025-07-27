import { useGetFollowersPublicationsQuery } from '@/services/pageHomeService'

import s from './feed.module.scss'

import { Publication } from './publication'

export const Feed = () => {
  const classNames = {
    container: s.container,
  }
  const { data } = useGetFollowersPublicationsQuery({})
  const publications = data?.items

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
    </div>
  )
}
