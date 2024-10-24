import type { Meta, StoryObj } from '@storybook/react'

import { CSSProperties } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'

import { FormCheckbox } from './FormCheckbox'

const meta = {
  component: FormCheckbox,
  tags: ['autodocs'],
  title: 'Components/Controlled/FormCheckbox',
} satisfies Meta<typeof FormCheckbox>

export default meta
type Story = StoryObj<typeof meta>

type FormValues = {
  iAgreeWithEverything: boolean
}

export const ControlledCheckboxWithErrorHandler: Story = {
  args: {} as any,
  render: () => {
    const {
      control,
      formState: { errors },
      handleSubmit,
      register,
    } = useForm<FormValues>()

    const onSubmit = (data: FormValues) => {
      alert(JSON.stringify(data))
    }

    const styles: CSSProperties = {
      display: 'grid',
      justifyItems: 'center',
      rowGap: '10px',
    }

    const iAgreeWithEverything = register('iAgreeWithEverything', {
      validate: value => value === true || 'consent required',
    })

    const isButtonDisabled = Boolean(Object.keys(errors).length)

    return (
      <form onSubmit={handleSubmit(onSubmit)} style={styles}>
        <Typography asChild variant={'h1'}>
          <h1>Form With Controlled Checkbox</h1>
        </Typography>
        <FormCheckbox
          control={control}
          label={'I agree with everything'}
          name={iAgreeWithEverything.name}
        />
        <Button disabled={isButtonDisabled} style={{ minWidth: '300px' }}>
          Send
        </Button>
      </form>
    )
  },
}
