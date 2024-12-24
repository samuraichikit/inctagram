import { ComponentProps } from 'react'

type TestButtonProps = ComponentProps<'button'>

export const TestButton = (props: TestButtonProps) => {
  return <button type={'submit'} {...props}></button>
}
