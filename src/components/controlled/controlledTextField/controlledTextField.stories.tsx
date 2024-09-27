import { CSSProperties } from 'react'
import { useForm } from 'react-hook-form'

import { ControlledTextField } from '@/components/controlled/controlledTextField'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { DevTool } from '@hookform/devtools'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  component: ControlledTextField,
  tags: ['autodocs'],
  title: 'Components/Controlled/ControlledTextField',
} satisfies Meta<typeof ControlledTextField>

export default meta
type Story = StoryObj<typeof meta>

type FormValues = {
  firstName: string
  lastName: string
}

export const Default: Story = {
  args: {} as any,

  render: () => {
    const { control, handleSubmit } = useForm<FormValues>()

    const onSubmit = (data: FormValues) => {
      alert(JSON.stringify(data))
    }

    const styles: CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      maxWidth: '400px',
      rowGap: '20px',
    }

    return (
      <form onSubmit={handleSubmit(onSubmit)} style={styles}>
        <DevTool control={control} />
        <Typography>Form With Controlled Text Fields</Typography>
        <ControlledTextField control={control} label={'First Name'} name={'firstName'} />
        <ControlledTextField control={control} label={'Last Name'} name={'lastName'} />
        <Button style={{ marginTop: '24px' }}>Send</Button>
      </form>
    )
  },
}
