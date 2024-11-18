import TimeAgo from 'react-timeago'

import { Avatar } from '@/components/ui/avatar'
import { Typography } from '@/components/ui/typography'

import s from './postComment.module.scss'

type Props = {
  answerCount: number
  avatarSrc: string
  comment: string
  createdAt: string
  userName: string
}

export const PostComment = ({ answerCount, avatarSrc, comment, createdAt, userName }: Props) => {
  const classNames = {
    answers: s.answers,
    comment: s.comment,
    container: s.container,
    content: s.content,
    timeAgo: s.timeAgo,
    userName: s.userName,
  }
  const displayViewAnswer = answerCount > 0

  return (
    <div className={classNames.container}>
      <Avatar height={36} src={avatarSrc} width={36} />
      <div className={classNames.content}>
        <Typography className={classNames.userName} variant={'bold_text_14'}>
          {userName}
        </Typography>{' '}
        <Typography className={classNames.comment} variant={'regular_text_14'}>
          {comment}
        </Typography>
        <Typography className={classNames.timeAgo} variant={'small_text'}>
          <TimeAgo date={createdAt} />
        </Typography>
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
