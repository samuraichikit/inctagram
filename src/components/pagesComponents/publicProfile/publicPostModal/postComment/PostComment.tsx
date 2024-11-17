import TimeAgo from 'react-timeago'

import { Avatar } from '@/components/ui/avatar'
import { Typography } from '@/components/ui/typography'

type Props = {
  answerCount: number
  avatarSrc: string
  comment: string
  createdAt: string
  userName: string
}

export const PostComment = ({ answerCount, avatarSrc, comment, createdAt, userName }: Props) => {
  const displayViewAnswer = answerCount > 0

  return (
    <>
      <Avatar src={avatarSrc} />
      <Typography variant={'bold_text_14'}>{userName}</Typography>
      <Typography variant={'regular_text_14'}>{comment}</Typography>
      <TimeAgo date={createdAt} />
      {displayViewAnswer && (
        <Typography variant={'semi-bold_small_text'}>{`View Answers (${answerCount})`}</Typography>
      )}
    </>
  )
}
