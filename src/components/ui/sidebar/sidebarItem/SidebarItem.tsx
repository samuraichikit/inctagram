import { ReactNode } from 'react'

import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'

import s from './sidebarItem.module.scss'

type Props = {
  children: ReactNode
  className?: string
  disabled?: boolean
  href: string
}

export const SidebarItem = ({ children, className, disabled, href }: Props) => {
  const router = useRouter()
  const isActive = router.pathname === href

  const classNames = {
    item: clsx(s.item, className),
    link: clsx(s.link, isActive && s.active, disabled && s.disabled),
  }

  return (
    <li className={classNames.item}>
      <Link className={classNames.link} href={href}>
        {children}
      </Link>
    </li>
  )
}
