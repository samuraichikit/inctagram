import { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'

import { useElementInView } from '@/common/hooks/useElementInView'
import { useTranslation } from '@/common/hooks/useTranslation'
import { useLazyGetCommentsQuery } from '@/services/publicPosts'
import { Button, Typography } from '@samuraichikit/inc-ui-kit'

import s from './viewAllComments.module.scss'

import { Comments } from '../../publicProfile/publicPostModal/postComment/answer/Comments'

type Props = {
  postId: string
}

export const ViewAllCommentsButton = ({ postId }: Props) => {
  const classNames = {
    buttonView: s.buttonView,
    text: s.text,
  }

  const [isShowComments, setIsShowComments] = useState(false)
  const { isInView, targetRef } = useElementInView({})

  const [getPostComments, { data, isLoading }] = useLazyGetCommentsQuery()
  const { t } = useTranslation()

  const comments = data?.items ?? []
  const commentsCount = data?.totalCount

  const toggleHandler = () => {
    setIsShowComments(!isShowComments)
  }

  useEffect(() => {
    if (isInView) {
      getPostComments({ postId })
    }
  }, [isInView, postId])

  if (isLoading) {
    return <Skeleton className={classNames.text} height={14} width={250} />
  }

  if (isShowComments) {
    return <Comments comments={comments} />
  }

  return (
    <div ref={targetRef}>
      {commentsCount ? (
        <Button asChild className={classNames.buttonView} onClick={toggleHandler} variant={'text'}>
          <Typography className={classNames.text} variant={'bold_text_14'}>
            {t.feed.viewAllComments} {commentsCount}
          </Typography>
        </Button>
      ) : (
        <Typography className={classNames.text} variant={'bold_text_14'}>
          {t.feed.noComments}
        </Typography>
      )}
    </div>
  )
}
