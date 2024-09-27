import { ComponentPropsWithoutRef } from 'react'
import { Control, FieldPath, FieldValues, useController } from 'react-hook-form'

import { TextField } from '@/components/ui/text-field'

type Props<T extends FieldValues> = {
  control: Control<T>
  name: FieldPath<T>
} & ComponentPropsWithoutRef<typeof TextField>

export const ControlledTextField = <T extends FieldValues>({
  control,
  name,
  ...props
}: Props<T>) => {
  const {
    field: { onChange, value, ...field },
  } = useController({
    control,
    name,
  })

  return (
    <>
      <TextField onChange={onChange} value={value} {...props} {...field} />
    </>
  )
}
