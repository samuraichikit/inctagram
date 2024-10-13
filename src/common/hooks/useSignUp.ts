import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { useSignUpMutation } from '@/services/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { signUpSchema } from '../schemas'

type FormValues = z.infer<typeof signUpSchema>
type FormField = keyof FormValues
type ServerErrorMessage = {
  field: FormField
  message: string
}
type ServerErrorData = {
  error: string
  messages: ServerErrorMessage[]
  statusCode: number
}
type ServerError = {
  data: ServerErrorData
  status: number
}

export const useSignUp = () => {
  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
    reset,
    setError,
    watch,
  } = useForm<FormValues>({
    defaultValues: {
      agreesToTOS: false,
      email: '',
      password: '',
      passwordConfirmation: '',
      userName: '',
    },
    mode: 'onBlur',
    resolver: zodResolver(signUpSchema),
  })

  const acceptTerms = watch('agreesToTOS')
  const isDisabled = !isValid && !acceptTerms

  const [signUp] = useSignUpMutation()
  const [isOpen, setIsOpen] = useState(false)
  const [emailModal, setEmailModal] = useState('')

  const onCloseHandler = () => setIsOpen(false)

  const onSubmitHandler = async (data: FormValues) => {
    const { email, password, userName } = data

    try {
      await signUp({ email, password, userName }).unwrap()
      setEmailModal(email)
      setIsOpen(true)
      reset()
    } catch (error) {
      const err = error as ServerError

      if (err.data.messages) {
        const field = err.data.messages[0].field
        const message = err.data.messages[0].message

        const wordsMessage = message.split(' ')

        wordsMessage[wordsMessage.length - 1] = 'registered'

        const updatedMessage = wordsMessage.join(' ')

        setError(field, {
          message: updatedMessage,
        })
      }
    }
  }

  return {
    control,
    emailModal,
    errors,
    handleSubmit,
    isDisabled,
    isOpen,
    onCloseHandler,
    onSubmitHandler,
    setIsOpen,
  }
}
