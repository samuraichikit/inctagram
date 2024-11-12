import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { TextArea, TextAreaProps } from '@/components/ui/text-area'

type Props<T extends FieldValues> = Omit<TextAreaProps, 'onChange' | 'value'> &
  UseControllerProps<T>

export const FormTextArea = <T extends FieldValues>({ control, name, ...props }: Props<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    name,
  })

  return <TextArea {...props} {...field} errorMessage={error?.message} />
}
