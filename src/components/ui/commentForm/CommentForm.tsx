import { useForm } from 'react-hook-form'

import { useTranslation } from '@/common/hooks/useTranslation'
import { commentSchema } from '@/common/schemas'
import { FormTextArea } from '@/components/controlled/formTextArea'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@samuraichikit/inc-ui-kit'
import { z } from 'zod'

type FormValues = z.infer<typeof commentSchema>

export const CommentForm = () => {
  const { t } = useTranslation()
  const {
    control,
    formState: { isValid },
    handleSubmit,
  } = useForm<FormValues>({
    defaultValues: {
      content: '',
    },
    resolver: zodResolver(commentSchema),
  })

  const submitHandler = (data: FormValues) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <FormTextArea control={control} name={'content'} placeholder={t.commentForm.addComment} />
      <Button disabled={!isValid} variant={'text'}>
        {t.commentForm.publish}
      </Button>
    </form>
  )
}
