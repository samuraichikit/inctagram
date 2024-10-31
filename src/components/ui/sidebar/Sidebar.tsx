import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export const Sidebar = ({ children }: Props) => {
  return (
    <nav>
      <ul>{children}</ul>
    </nav>
  )
}
