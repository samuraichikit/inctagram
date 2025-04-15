import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { TextField, TextFieldProps } from '@samuraichikit/inc-ui-kit'

type Props<T extends FieldValues> = { mandatory?: boolean } & Omit<
  TextFieldProps,
  'onChange' | 'value'
> &
  UseControllerProps<T>

export const FormTextField = <T extends FieldValues>({
  control,
  mandatory,
  name,
  ...props
}: Props<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    name,
  })

  return <TextField mandatory={mandatory} {...props} {...field} errorMessage={error?.message} />
}
