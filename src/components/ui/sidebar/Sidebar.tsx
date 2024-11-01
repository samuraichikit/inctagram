import { ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
}

export const Sidebar = ({ children, className }: Props) => {
  return <nav className={className}>{children}</nav>
}
