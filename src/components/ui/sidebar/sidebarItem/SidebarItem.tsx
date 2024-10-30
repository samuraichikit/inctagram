import { ReactNode } from 'react'

import Link from 'next/link'

type Props = {
  children: ReactNode
  href: string
}

export const SidebarItem = ({ children, href }: Props) => {
  return (
    <li>
      <Link href={href}>{children}</Link>
    </li>
  )
}
