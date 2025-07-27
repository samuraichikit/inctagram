import { useGetFollowersPublicationsQuery } from '@/services/pageHomeService'

import { Publication } from './publication'

export const Feed = () => {
  const { data } = useGetFollowersPublicationsQuery({})
  const publications = data?.items

  return (
    <>
      {publications?.map(publication => (
        <Publication
          avatarOwner={publication.avatarOwner}
          avatarsSrc={publication.avatarWhoLikes}
          createdAt={publication.createdAt}
          images={publication.images}
          key={publication.id}
          likesCount={publication.likesCount}
          postId={publication.id}
          userName={publication.userName}
        />
      ))}
    </>
  )
}
