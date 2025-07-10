import { useForm } from 'react-hook-form'

import { useTranslation } from '@/common/hooks/useTranslation'
import { commentSchema } from '@/common/schemas'
import { FormTextArea } from '@/components/controlled/formTextArea'
import { useAddCommentMutation } from '@/services/commentsAnswers'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@samuraichikit/inc-ui-kit'
import { z } from 'zod'

import s from './commentForm.module.scss'

type FormValues = z.infer<typeof commentSchema>
type Props = {
  postId: number
}

export const CommentForm = ({ postId }: Props) => {
  const classNames = {
    container: s.container,
    submitButton: s.submitButton,
  }
  const { t } = useTranslation()
  const {
    control,
    formState: { isValid },
    handleSubmit,
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      content: '',
    },
    resolver: zodResolver(commentSchema),
  })
  const [addComment] = useAddCommentMutation()

  const submitHandler = ({ content }: FormValues) => {
    addComment({ content, postId })
    reset()
  }

  return (
    <form className={classNames.container} onSubmit={handleSubmit(submitHandler)}>
      <FormTextArea control={control} name={'content'} placeholder={t.commentForm.addComment} />
      <Button className={classNames.submitButton} disabled={!isValid} variant={'text'}>
        {t.commentForm.publish}
      </Button>
    </form>
  )
}
