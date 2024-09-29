import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { TextField, TextFieldProps } from '@/components/ui/text-field'

type Props<T extends FieldValues> = Omit<TextFieldProps, 'onChange' | 'value'> &
  UseControllerProps<T>

export const FormTextField = <T extends FieldValues>({ control, name, ...props }: Props<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    name,
  })

  return <TextField {...props} {...field} errorMessage={error?.message} />
}
