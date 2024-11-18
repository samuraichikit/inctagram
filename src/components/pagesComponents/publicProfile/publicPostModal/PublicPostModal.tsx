import { Modal } from '@/components/ui/modal'
import { Comment, UserImage } from '@/services/publicPosts'

import s from './publicPostModal.module.scss'

import { PublicImages } from '../../publicPage/publicPosts/publicImages'
import { UserInfo } from '../../publicPage/publicPosts/userInfo'
import { PostComments } from './postComments'
import { PostLikes } from './postLikes'

type Props = {
  avatarWhoLikes: string[]
  comments: Comment[]
  createdAt: string
  likesCount: number
  ownerAvatarSrc: string
  ownerUserName: string
  postImages: UserImage[]
}

export const PublicPostModal = ({
  avatarWhoLikes,
  comments,
  createdAt,
  likesCount,
  ownerAvatarSrc,
  ownerUserName,
  postImages,
}: Props) => {
  const classNames = {
    container: s.container,
    postDetails: s.postDetails,
    userInfoContainer: s.userInfoContainer,
  }

  return (
    <Modal open>
      <div className={classNames.container}>
        <PublicImages height={562} images={postImages} width={490} />
        <div className={classNames.postDetails}>
          <div className={classNames.userInfoContainer}>
            <UserInfo src={ownerAvatarSrc} userName={ownerUserName} />
          </div>
          <PostComments comments={comments} />
          <PostLikes avatarsSrc={avatarWhoLikes} createdAt={createdAt} likesCount={likesCount} />
        </div>
      </div>
    </Modal>
  )
}
