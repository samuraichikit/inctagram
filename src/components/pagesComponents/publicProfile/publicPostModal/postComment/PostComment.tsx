import { Avatar } from '@/components/ui/avatar'
import { TimeAgoDisplay } from '@/components/ui/timeAgoDisplay'
import { Typography } from '@/components/ui/typography'

import s from './postComment.module.scss'

type Props = {
  answerCount?: number
  avatarSrc: string
  comment: string
  createdAt: string
  userName: string
}

export const PostComment = ({
  answerCount = 0,
  avatarSrc,
  comment,
  createdAt,
  userName,
}: Props) => {
  const classNames = {
    answers: s.answers,
    avatar: s.avatar,
    comment: s.comment,
    container: s.container,
    timeAgo: s.timeAgo,
    userAndComment: s.userAndComment,
    userName: s.userName,
  }
  const displayViewAnswer = answerCount > 0

  return (
    <div className={classNames.container}>
      <Avatar className={classNames.avatar} height={36} src={avatarSrc} width={36} />
      <div>
        <div className={classNames.userAndComment}>
          <Typography className={classNames.userName} variant={'bold_text_14'}>
            {userName}
          </Typography>{' '}
          <Typography className={classNames.comment} variant={'regular_text_14'}>
            {comment}
          </Typography>
        </div>
        <TimeAgoDisplay className={classNames.timeAgo} date={createdAt} />
        {displayViewAnswer && (
          <Typography
            className={classNames.answers}
            variant={'semi-bold_small_text'}
          >{`View Answers (${answerCount})`}</Typography>
        )}
      </div>
    </div>
  )
}
